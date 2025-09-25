import { db } from '../../lib/drizzle';
import { usersToRoles, users, roles } from '../schema';

export class UserToRoleSeeder {
  static async seed() {
    const usersResult = await db.select().from(users);
    const rolesResult = await db.select().from(roles);

    const adminRoleId = rolesResult.find((role) => role.name === 'admin')?.id;
    const userRoleId = rolesResult.find((role) => role.name === 'user')?.id;

    return await db.insert(usersToRoles).values([
      { user_id: usersResult[0].id, role_id: adminRoleId },
      { user_id: usersResult[1].id, role_id: userRoleId },
    ]);
  }
}
