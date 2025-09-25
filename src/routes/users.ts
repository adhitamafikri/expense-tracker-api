import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res
    .json({
      message: "Users",
    })
    .status(200);
});

export default router;
