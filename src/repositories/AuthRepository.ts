import { eq, inArray } from 'drizzle-orm';
import { roles, users, usersToRoles } from '../db/schema';
import { db } from '../lib/drizzle';

export class AuthRepository {
  private db: typeof db;

  constructor() {
    this.db = db;
  }

  async findUserByPhone(phone: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.phone, phone))
      .limit(1);

    return result[0];
  }

  async findRolesByUserId(userId: string) {
    const roleIds = await this.db
      .select()
      .from(usersToRoles)
      .where(eq(usersToRoles.user_id, userId));

    const rolesResult = await this.db
      .select()
      .from(roles)
      .where(
        inArray(
          roles.id,
          roleIds.map((role) => role.role_id),
        ),
      );

    return rolesResult;
  }
}
