import { AuthRepository } from '../repositories/AuthRepository';
import { generateToken } from '../lib/jwt';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(phone: string, password: string, host: string) {
    const user = await this.authRepository.findUserByPhone(phone);
    const roles = await this.authRepository.findRolesByUserId(user.id);

    if (!user) {
      throw new Error('User not found');
    }
    if (!roles) {
      throw new Error('Roles not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    const rolesNames = roles.map((role) => role.name);
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles: rolesNames,
    };
    const accessToken = generateToken(
      { iss: host, sub: user.id, roles: rolesNames },
      { tokenType: 'access', expiresIn: '15m' },
    );
    const refreshToken = generateToken(
      { iss: host, sub: user.id, roles: rolesNames },
      { tokenType: 'refresh', expiresIn: '1d' },
    );

    return { user: userData, accessToken, refreshToken };
  }
}
