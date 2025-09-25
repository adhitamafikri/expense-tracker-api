import express, { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
router.use(express.json());

const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
