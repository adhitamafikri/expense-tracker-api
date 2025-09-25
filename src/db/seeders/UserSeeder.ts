import { db } from '../../lib/drizzle';
import { users } from '../schema';

export class UserSeeder {
  static async seed() {
    return await db.insert(users).values([
      {
        name: 'Fikri Admin',
        age: 25,
        phone: '1234567890',
        email: 'fikri.admin@example.com',
        password: 'password',
      },
      {
        name: 'Fikri User',
        age: 25,
        phone: '1234567891',
        email: 'fikri.user@example.com',
        password: 'password',
      },
    ]);
  }
}
