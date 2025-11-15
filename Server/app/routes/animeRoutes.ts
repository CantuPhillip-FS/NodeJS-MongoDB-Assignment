import { Router } from "express";
import {
  createAnime,
  deleteAnime,
  getAllAnimes,
  getAnimeById,
  updateAnime,
} from "../controller/animeController.js";
const router = Router();

router.get("/", getAllAnimes);

router.get("/:id", getAnimeById);

router.post("/", createAnime);

router.put("/:id", updateAnime);

router.delete("/:id", deleteAnime);

export default router;
