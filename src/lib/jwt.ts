import dayjs from 'dayjs';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export type GenerateTokenPayload = {
  iss: string;
  sub: string;
  roles: string[];
  tokenType: 'access_token' | 'refresh_token';
};

function generateToken(
  payload: GenerateTokenPayload,
  options: {
    tokenType: 'access_token' | 'refresh_token';
    expiresIn: SignOptions['expiresIn'];
  },
) {
  const secret =
    options.tokenType === 'access_token'
      ? process.env.JWT_ACCESS_SECRET!
      : process.env.JWT_REFRESH_SECRET!;
  return jwt.sign(payload, secret, { expiresIn: options.expiresIn });
}

function verifyToken(
  token: string,
  tokenType: 'access_token' | 'refresh_token',
) {
  const secret =
    tokenType === 'access_token'
      ? process.env.JWT_ACCESS_SECRET!
      : process.env.JWT_REFRESH_SECRET!;
  return jwt.verify(token, secret);
}

function decodeToken(token: string) {
  return jwt.decode(token);
}

function getTokenTTLInSeconds(token: string) {
  const decoded = decodeToken(token) as JwtPayload;
  const now = Math.floor(dayjs().unix());
  const expiresAt = decoded.exp || 0;
  return expiresAt - now;
}

export { generateToken, verifyToken, decodeToken, getTokenTTLInSeconds };
