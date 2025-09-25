import {
  integer,
  pgTable,
  uuid,
  varchar,
  decimal,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { timestamps } from './utils';

export const users = pgTable(
  'users',
  {
    id: uuid()
      .notNull()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    phone: varchar({ length: 25 }).notNull().unique(),
    email: varchar({ length: 150 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('email_unique').on(table.email),
    uniqueIndex('phone_unique').on(table.phone),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));

export const roles = pgTable('roles', {
  id: uuid()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 100 }).notNull(),
  ...timestamps,
});

export const rolesRelations = relations(roles, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));

export const usersToRoles = pgTable(
  'users_to_roles',
  {
    user_id: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    role_id: uuid()
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.user_id, table.role_id] })],
);

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersToRoles.user_id],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersToRoles.role_id],
    references: [roles.id],
  }),
}));

export const categories = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
  type: varchar({ length: 25, enum: ['income', 'expense'] }).notNull(),
  ...timestamps,
});

export const expenses = pgTable('expenses', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: decimal({ precision: 12, scale: 2 }).notNull(),
  category_id: integer().references(() => categories.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  user_id: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  ...timestamps,
});

export const incomes = pgTable('incomes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: decimal({ precision: 12, scale: 2 }).notNull(),
  category_id: integer().references(() => categories.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  user_id: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  ...timestamps,
});
