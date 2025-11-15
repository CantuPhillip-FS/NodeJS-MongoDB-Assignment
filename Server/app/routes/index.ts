import type { Request, Response } from "express";
import express from "express";
import animeRoutes from "./animeRoutes.js";
import studioRoutes from "./studioRoutes.js";
import userRoutes from "./userRoutes.js";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - Request made`,
  });
});

router.use("/studio", studioRoutes);
router.use("/anime", animeRoutes);
router.use("/user", userRoutes);

export default router;
