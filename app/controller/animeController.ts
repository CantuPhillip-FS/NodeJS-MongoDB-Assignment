import type { Request, Response } from "express";
import mongoose from "mongoose";
import Anime from "../models/Anime.js";
import Studio from "../models/Studio.js";

/* -------------------------------------------------------------------------- */
/*                              POST: New Anime                              */
/* -------------------------------------------------------------------------- */
export const createAnime = async (req: Request, res: Response) => {
  try {
    // Check that a request body was sent
    const data = req.body;
    if (!data) {
      res.status(400).json({
        message:
          "Please send your request again with a title, year_released, averageRating, and studio.",
        status: "failed",
      });
    }
    // Validate the studio id given
    const id = data.studio;
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId for studio given: ${id}`,
        status: "failed",
      });
    }
    // First, find the Studio by the Studio's ID given:
    const studio = await Studio.findById(data.studio);

    if (!studio) {
      return res.status(400).json({
        message:
          "A studio by the id cannot be found. Please send your request again.",
        status: "failed",
      });
    }
    // Next, update the data with the Studio's information:
    data.studio = studio;
    // Then, create a new Anime model
    const animeData = new Anime(data);
    // Push the studio id to the studio.animes array
    studio.animes.push(animeData._id);
    // save the anime and studio data
    const queries = [animeData.save(), studio.save()];
    await Promise.all(queries);

    res.status(201).json({
      message: `${req.method} - Request made`,
      status: "successful",
      anime: data,
    });
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
  // grab user's query
  const query: any = req.query;

  try {
    // Check if user queried with select
    if (query.select) {
      console.log("SELECT found in query");
      const fieldsIncluded = query.select.split(",").join(" ");
      try {
        const animes = await Anime.find().select(fieldsIncluded);
        return res.status(200).json({
          message: `${req.method} - Request made`,
          status: "successful",
          animes,
        });
      } catch (error) {
        return res.status(500).json({
          message: `${req.method} - Request made`,
          status: "failed",
          error,
        });
      }
    }

    // Check if user passed a sort query
    if (query.sort) {
      console.log("SORT found in query");
      const sortBy = query.sort.split(",").join(" ");
      try {
        const animes = await Anime.find().sort(sortBy);
        return res.status(200).json({
          message: `${req.method} - Request made`,
          status: "successful",
          animes,
        });
      } catch (error) {
        return res.status(500).json({
          message: `${req.method} - Request made`,
          status: "failed",
        });
      }
    }

    // GET ALL ANIME WITHOUT ANY QUERIES OR PARAMETERS:
    const Animes = await Anime.find({})
      .populate({
        path: "studio",
        select: "name year_founded headquarters website -_id",
      })
      .select("-createdAt -updatedAt -__v")
      .exec();
    res.status(200).json({
      message: `${req.method} - Request made`,
      status: "successful",
      animes: Animes,
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
  // grab user's query
  const query: any = req.query;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        status: "failed",
      });
    }

    // Check if user queried with select
    if (query.select) {
      console.log("SELECT found in query");
      const fieldsIncluded = query.select.split(",").join(" ");
      try {
        const anime = await Anime.findById(id).select(fieldsIncluded);
        return res.status(200).json({
          message: `${req.method} - Request made`,
          status: "successful",
          anime,
        });
      } catch (error) {
        return res.status(500).json({
          message: `${req.method} - Request made`,
          status: "failed",
          error,
        });
      }
    }

    const foundAnime = await Anime.findById(id)
      .populate({
        path: "studio",
        select: "name year_founded headquarters website -_id",
      })
      .select("-createdAt -updatedAt -__v")
      .exec();
    if (!foundAnime) {
      return res.status(404).json({
        message: `No Anime found with id: ${id}`,
        status: "failed",
      });
    }

    res.status(200).json({
      message: `${req.method} - Request made`,
      status: "successful",
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
        status: "failed",
      });
    }
    const foundAnime = await Anime.findById(id);
    if (!foundAnime) {
      return res.status(404).json({
        message: `No Anime found with id: ${id}`,
        status: "failed",
      });
    }
    const data = req.body;
    if (data === undefined) {
      res.status(400).json({
        message:
          "Please send your request again with a title, year_released, averageRating, and studio.",
        status: "failed",
      });
    } else {
      const anime = await Anime.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json({
        message: `${req.method} - Request made`,
        status: "successful",
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
        status: "failed",
      });
    }
    const foundAnime = await Anime.findById(id);
    if (!foundAnime) {
      return res.status(404).json({
        message: `No Anime found with id: ${id}`,
        status: "failed",
      });
    } else {
      await Anime.deleteOne({ _id: id }).exec();
      return res.status(200).json({
        message: `Anime has been deleted`,
        status: "successful",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
