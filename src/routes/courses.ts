import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', (req: Request, res: Response) => {
  res
    .json({
      message: 'Courses',
    })
    .status(200);
});

router.get('/:slug', (req: Request, res: Response) => {
  res
    .json({
      message: `Course by slug ${req.params.slug}`,
    })
    .status(200);
});

export default router;
