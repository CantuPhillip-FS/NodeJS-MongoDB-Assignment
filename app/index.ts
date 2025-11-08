import dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";
import morgan from "morgan";
import routeHandler from "./routes/index.js";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running.", success: true });
});

app.use("/api/v1", routeHandler);

export default app;
