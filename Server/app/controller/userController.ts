import type { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

/* -------------------------------------------------------------------------- */
/*                              POST: New User                              */
/* -------------------------------------------------------------------------- */
export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data received. Required: firstname, lastname, email.",
        status: "failed",
      });
    }
    const firstName = data.firstname;
    const lastName = data.lastname;
    const email = data.email;
    const user = {
      firstName,
      lastName,
      email,
    };
    const newUser = await User.create(user);
    return res.status(201).json({
      message: `${req.method} - Request made`,
      status: "successful",
      user: newUser,
    });
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
    const users = await User.find();
    if (!users || Object.keys(users).length === 0) {
      return res.status(400).json({
        message: "No exisiting users. Send a POST request to creat one.",
        status: "failed",
      });
    }
    return res.status(200).json({
      message: `${req.method} - Request made`,
      status: "successful",
      users,
    });
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
    const user = await User.findById(id);
    if (!user || Object.keys(user).length === 0) {
      return res.status(404).json({
        message: `No user found with id: ${id}`,
        status: "failed",
      });
    }
    return res.status(200).json({
      message: `${req.method} - Request made`,
      status: "successful",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                            PUT: Update a User                           */
/* -------------------------------------------------------------------------- */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        status: "failed",
      });
    }

    // Check for request body BEFORE fetch
    const data = req.body;
    if (!data || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data received. Required: firstname, lastname, email.",
        status: "failed",
      });
    }

    const foundUser = await User.findById(id);
    if (!foundUser || Object.keys(foundUser).length === 0) {
      return res.status(404).json({
        message: `No user found with id: ${id}`,
        status: "failed",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({
      message: `${req.method} - Request made`,
      status: "successful",
      user: updatedUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                          DELETE: Remove a User                          */
/* -------------------------------------------------------------------------- */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        status: "failed",
      });
    }
    const user = await User.findById(id);
    if (!user || Object.keys(user).length === 0) {
      return res.status(404).json({
        message: `No user found with id: ${id}`,
        status: "failed",
      });
    }
    await User.deleteOne({ _id: id }).exec();
    return res.status(200).json({
      message: `User has been deleted`,
      status: "successful",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};
