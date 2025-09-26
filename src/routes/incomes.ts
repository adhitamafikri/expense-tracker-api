import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res
    .json({
      message: 'incomes',
    })
    .status(200);
});

router.get('/:id', (req: Request, res: Response) => {
  res
    .json({
      message: `Income by id ${req.params.id}`,
    })
    .status(200);
});

export default router;
