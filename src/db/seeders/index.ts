import { db } from '../../lib/drizzle';
import { usersTable, categoriesTable, rolesTable } from '../schema';

export const seedRoles = async () => {
  await db.insert(rolesTable).values([{ name: 'admin' }, { name: 'user' }]);
};

export const seedUsers = async () => {
  await db.insert(usersTable).values([
    {
      name: 'Fikri Admin',
      age: 25,
      phone: '1234567890',
      email: 'fikri.admin@example.com',
      password: 'password',
      role_id: 1,
    },
    {
      name: 'Fikri User',
      age: 25,
      phone: '1234567891',
      email: 'fikri.user@example.com',
      password: 'password',
      role_id: 2,
    },
  ]);
};

export const seedCategories = async () => {
  await db.insert(categoriesTable).values([
    { name: 'Food', type: 'expense' },
    { name: 'Transport', type: 'expense' },
    { name: 'Entertainment', type: 'expense' },
    { name: 'Bills', type: 'expense' },
    { name: 'Health', type: 'expense' },
    { name: 'Education', type: 'expense' },
    { name: 'Shopping', type: 'expense' },
    { name: 'Travel', type: 'expense' },
    { name: 'Other', type: 'expense' },
    { name: 'Salary', type: 'income' },
    { name: 'Deposit', type: 'income' },
    { name: 'Gift', type: 'income' },
  ]);
};

// Execute all seeders
async function seed() {
  try {
    const seeders = [seedRoles, seedUsers, seedCategories];
    console.log('--- Seeding database...');
    for (const seeder of seeders) {
      await seeder();
      console.log(`--- ✅ Successfully executed ${seeder.name}`);
    }
    console.log('--- ✅ All seeders executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Something went wrong when seeding database', error);
    process.exit(1);
  }
}

seed();
