import { db } from '../../lib/drizzle';
import { roles } from '../schema';

export class RoleSeeder {
  static async seed() {
    return await db.insert(roles).values([{ name: 'admin' }, { name: 'user' }]);
  }
}
