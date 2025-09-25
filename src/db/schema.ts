import {
  integer,
  pgTable,
  varchar,
  decimal,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { timestamps } from './utils';

export const usersTable = pgTable(
  'users',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    phone: varchar({ length: 25 }).notNull().unique(),
    email: varchar({ length: 150 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role_id: integer().references(() => rolesTable.id),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('email_unique').on(table.email),
    uniqueIndex('phone_unique').on(table.phone),
  ],
);

export const rolesTable = pgTable('roles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
  ...timestamps,
});

export const categoriesTable = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
  type: varchar({ length: 25, enum: ['income', 'expense'] }).notNull(),
  ...timestamps,
});

export const expensesTable = pgTable('expenses', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: decimal({ precision: 12, scale: 2 }).notNull(),
  category_id: integer().references(() => categoriesTable.id),
  user_id: integer().references(() => usersTable.id),
  ...timestamps,
});

export const incomesTable = pgTable('incomes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: decimal({ precision: 12, scale: 2 }).notNull(),
  category_id: integer().references(() => categoriesTable.id),
  user_id: integer().references(() => usersTable.id),
  ...timestamps,
});
