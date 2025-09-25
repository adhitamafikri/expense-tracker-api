import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res
    .json({
      message: "Courses",
    })
    .status(200);
});

router.get("/:slug", (req: Request, res: Response) => {
  res
    .json({
      message: `Course by slug ${req.params.slug}`,
    })
    .status(200);
});

export default router;
