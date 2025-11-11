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
        success: false,
      });
    } else {
      const newStudio = await Studio.create(data);
      res.status(201).json({
        message: `From the Studio API route with ${req.method}`,
        success: true,
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
  try {
    const Studios = await Studio.find({});
    res.status(200).json({
      studios: Studios,
      success: true,
      message: `${req.method} - request to studio endpoint`,
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
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        success: false,
      });
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
        success: false,
      });
    }
    res.status(200).json({
      message: `${req.method} - request to Studio endpoint`,
      success: true,
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
        success: false,
      });
    }
    const foundStudio = await Studio.findById(id);
    if (!foundStudio) {
      return res.status(404).json({
        message: `No Studio found with id: ${id}`,
        success: false,
      });
    }
    const data = req.body;
    if (data === undefined) {
      res.status(400).json({
        message:
          "Please send your request again with a name, year_founded, headquarters, website, and isActive.",
        success: false,
      });
    } else {
      const studio = await Studio.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json({
        message: `From the Studio API route with ${req.method}`,
        success: true,
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
        success: false,
      });
    }
    const foundStudio = await Studio.findById(id);
    if (!foundStudio) {
      return res.status(404).json({
        message: `No Studio found with id: ${id}`,
        success: false,
      });
    } else {
      await Studio.deleteOne({ _id: id }).exec();
      return res.status(200).json({
        message: `Studio has been deleted`,
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
