import { AuthRepository } from '../repositories/AuthRepository';
import { generateToken, getTokenTTLInSeconds } from '../lib/jwt';
import { getRedisClient } from '../lib/redis';

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
      { iss: host, sub: user.id, roles: rolesNames, tokenType: 'access_token' },
      { tokenType: 'access_token', expiresIn: '15m' },
    );
    const refreshToken = generateToken(
      {
        iss: host,
        sub: user.id,
        roles: rolesNames,
        tokenType: 'refresh_token',
      },
      { tokenType: 'refresh_token', expiresIn: '1d' },
    );

    // calculate the ttl of the tokens before storing them in redis
    // the reason is we want to prevent the tokens from being stored in redis exceeeding the 'exp' field of the tokens
    const accessTokenTTL = getTokenTTLInSeconds(accessToken);
    const refreshTokenTTL = getTokenTTLInSeconds(refreshToken);

    // store the tokens in redis
    const redisClient = getRedisClient();
    await redisClient.set(`auth:user:${user.id}:access_token`, accessToken, {
      expiration: {
        type: 'EX',
        value: accessTokenTTL,
      },
    });
    await redisClient.set(`auth:user:${user.id}:refresh_token`, refreshToken, {
      expiration: {
        type: 'EX',
        value: refreshTokenTTL,
      },
    });

    return { user: userData, accessToken, refreshToken };
  }
}
