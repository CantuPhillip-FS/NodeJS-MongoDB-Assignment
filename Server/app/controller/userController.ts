import type { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

/* -------------------------------------------------------------------------- */
/*                              POST: New User                              */
/* -------------------------------------------------------------------------- */
export const createUser = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: All Users                              */
/* -------------------------------------------------------------------------- */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = User.find();
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: User By Id                             */
/* -------------------------------------------------------------------------- */
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        status: "failed",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};
