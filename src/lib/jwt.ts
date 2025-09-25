import jwt, { SignOptions } from 'jsonwebtoken';

export type GenerateTokenPayload = {
  iss: string;
  sub: string;
  roles: string[];
};

function generateToken(
  payload: GenerateTokenPayload,
  options: {
    tokenType: 'access' | 'refresh';
    expiresIn: SignOptions['expiresIn'];
  },
) {
  const secret =
    options.tokenType === 'access'
      ? process.env.JWT_ACCESS_SECRET!
      : process.env.JWT_REFRESH_SECRET!;
  return jwt.sign(payload, secret, { expiresIn: options.expiresIn });
}

function verifyToken(token: string, tokenType: 'access' | 'refresh') {
  const secret =
    tokenType === 'access'
      ? process.env.JWT_ACCESS_SECRET!
      : process.env.JWT_REFRESH_SECRET!;
  return jwt.verify(token, secret);
}

export { generateToken, verifyToken };
