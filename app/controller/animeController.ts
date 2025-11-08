import type { Request, Response } from "express";
import mongoose from "mongoose";
import Anime from "../models/Anime.js";

/* -------------------------------------------------------------------------- */
/*                              POST: New Anime                              */
/* -------------------------------------------------------------------------- */
export const createAnime = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (data === undefined) {
      res.status(400).json({
        message:
          "Please send your request again with a title, year_released, averageRating, and studio.",
        success: false,
      });
    } else {
      const newAnime = await Anime.create(data);
      res.status(200).json({
        message: `From the Anime API route with ${req.method}`,
        success: true,
        anime: newAnime,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: All Animes                              */
/* -------------------------------------------------------------------------- */
export const getAllAnimes = async (req: Request, res: Response) => {
  try {
    const Animes = await Anime.find({});
    res.status(200).json({
      animes: Animes,
      success: true,
      message: `${req.method} - request to anime endpoint`,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: Anime By Id                             */
/* -------------------------------------------------------------------------- */
export const getAnimeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        success: false,
      });
    }
    const foundAnime = await Anime.findById(id);
    if (!foundAnime) {
      return res.status(404).json({
        message: `No Anime found with id: ${id}`,
        success: false,
      });
    }
    res.status(200).json({
      message: `${req.method} - request to Anime endpoint`,
      success: true,
      anime: foundAnime,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                            PUT: Update an Anime                           */
/* -------------------------------------------------------------------------- */
export const updateAnime = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        success: false,
      });
    }
    const foundAnime = await Anime.findById(id);
    if (!foundAnime) {
      return res.status(404).json({
        message: `No Anime found with id: ${id}`,
        success: false,
      });
    }
    const data = req.body;
    if (data === undefined) {
      res.status(400).json({
        message:
          "Please send your request again with a title, year_released, averageRating, and studio.",
        success: false,
      });
    } else {
      const anime = await Anime.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json({
        message: `From the Anime API route with ${req.method}`,
        success: true,
        anime,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                          DELETE: Remove an Anime                          */
/* -------------------------------------------------------------------------- */
export const deleteAnime = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        success: false,
      });
    }
    const foundAnime = await Anime.findById(id);
    if (!foundAnime) {
      return res.status(404).json({
        message: `No Anime found with id: ${id}`,
        success: false,
      });
    } else {
      await Anime.deleteOne({ _id: id }).exec();
      return res.status(200).json({
        message: `Anime has been deleted`,
        success: false,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
