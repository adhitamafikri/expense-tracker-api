import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../lib/jwt';

export const authMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const bearerToken = req.headers.authorization;
    const refreshToken = req.headers['x-refresh-token'];

    if (!bearerToken || !refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const actualAccessToken = bearerToken.split('Bearer ')[1];
    const isValidAccessToken = verifyToken(actualAccessToken, 'access_token');
    const isValidRefreshToken = verifyToken(
      refreshToken as string,
      'refresh_token',
    );

    if (!isValidAccessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!isValidRefreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (error: Error | unknown) {
    if ((error as Error).name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
