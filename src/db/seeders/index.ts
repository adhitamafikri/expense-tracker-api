import { RoleSeeder } from './RoleSeeder';
import { UserSeeder } from './UserSeeder';
import { UserToRoleSeeder } from './UserToRoleSeeder';
import { CategorySeeder } from './CategorySeeder';

// Execute all seeders
async function seed() {
  try {
    const seeders = [
      RoleSeeder.seed,
      UserSeeder.seed,
      UserToRoleSeeder.seed,
      CategorySeeder.seed,
    ];
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
