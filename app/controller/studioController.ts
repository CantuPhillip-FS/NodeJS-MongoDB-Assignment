import type { Request, Response } from "express";
import mongoose from "mongoose";
import Studio from "../models/Studio.js";

/* -------------------------------------------------------------------------- */
/*                              POST: New Studio                              */
/* -------------------------------------------------------------------------- */
export const createStudio = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (data === undefined) {
      res.status(400).json({
        message:
          "Please send your request again with a name, year_founded, headquarters, and website.",
        status: "failed",
      });
    } else {
      const newStudio = await Studio.create(data);
      res.status(201).json({
        message: `From the Studio API route with ${req.method}`,
        status: "successful",
        studio: newStudio,
      });
    }
  } catch (error: any) {
    // from what I learned it seems that error can only be uknown or any
    // I chose any because it works for all errors without any if statements
    // but it basically disables type safety, since it's just an error message I'm okay with that
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: All Studios                              */
/* -------------------------------------------------------------------------- */
export const getAllStudios = async (req: Request, res: Response) => {
  // grab user's query
  const query: any = req.query;

  try {
    // Check if user queried with select
    if (query.select) {
      console.log("SELECT found in query");
      const fieldsIncluded = query.select.split(",").join(" ");
      try {
        const studios = await Studio.find().select(fieldsIncluded);
        return res.status(200).json({
          message: `${req.method} - Request made`,
          status: "successful",
          studios,
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
        const studios = await Studio.find().sort(sortBy);
        return res.status(200).json({
          message: `${req.method} - Request made`,
          status: "successful",
          studios,
        });
      } catch (error) {
        return res.status(500).json({
          message: `${req.method} - Request made`,
          status: "failed",
        });
      }
    }

    // GET ALL STUDIO WITHOUT ANY QUERIES OR PARAMETERS:
    const Studios = await Studio.find({})
      .populate({
        path: "animes",
        select: "title year_released averageRating -_id",
      })
      .select("-createdAt -updatedAt -__v")
      .exec();
    res.status(200).json({
      studios: Studios,
      status: "successful",
      message: `${req.method} - Request made`,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: Studio By Id                             */
/* -------------------------------------------------------------------------- */
export const getStudioById = async (req: Request, res: Response) => {
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
        const studio = await Studio.findById(id).select(fieldsIncluded);
        return res.status(200).json({
          message: `${req.method} - Request made`,
          status: "successful",
          studio,
        });
      } catch (error) {
        return res.status(500).json({
          message: `${req.method} - Request made`,
          status: "failed",
          error,
        });
      }
    }

    const foundStudio = await Studio.findById(id)
      .populate({
        path: "animes",
        select: "title year_released averageRating -_id",
      })
      .select("-createdAt -updatedAt -__v")
      .exec();
    if (!foundStudio) {
      return res.status(404).json({
        message: `No Studio found with id: ${id}`,
        status: "failed",
      });
    }
    res.status(200).json({
      message: `${req.method} - Request made`,
      status: "successful",
      studio: foundStudio,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                            PUT: Update an Studio                           */
/* -------------------------------------------------------------------------- */
export const updateStudio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        status: "failed",
      });
    }
    const foundStudio = await Studio.findById(id);
    if (!foundStudio) {
      return res.status(404).json({
        message: `No Studio found with id: ${id}`,
        status: "failed",
      });
    }
    const data = req.body;
    if (data === undefined) {
      res.status(400).json({
        message:
          "Please send your request again with a name, year_founded, headquarters, website, and isActive.",
        status: "failed",
      });
    } else {
      const studio = await Studio.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json({
        message: `${req.method} - Request made`,
        status: "successful",
        studio,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                          DELETE: Remove an Studio                          */
/* -------------------------------------------------------------------------- */
export const deleteStudio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        status: "failed",
      });
    }
    const foundStudio = await Studio.findById(id);
    if (!foundStudio) {
      return res.status(404).json({
        message: `No Studio found with id: ${id}`,
        status: "failed",
      });
    } else {
      await Studio.deleteOne({ _id: id }).exec();
      return res.status(200).json({
        message: `Studio has been deleted`,
        status: "successful",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
