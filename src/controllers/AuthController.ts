import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const data = await this.authService.login(
        req.body.phone,
        req.body.password,
        req.headers.host || 'localhost',
      );

      return res.status(200).json({ message: 'Login successful', data });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };

  register = async (req: Request, res: Response) => {
    console.log('the register', req.body);
    res.json({ message: 'register' });
  };

  refreshToken = async (req: Request, res: Response) => {
    console.log('the refresh token', req.body);
    res.json({ message: 'refresh token' });
  };

  logout = async (req: Request, res: Response) => {
    console.log('the logout', req.body);
    res.json({ message: 'logout' });
  };
}
