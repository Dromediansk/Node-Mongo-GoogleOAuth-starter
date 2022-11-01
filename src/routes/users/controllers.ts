import { Request, Response } from "express";
import Note from "../../models/note";
import User from "../../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unable to get all users!",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params ? req.params.id : "";
    const user = await User.findById(id);

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unable to get user!",
    });
  }
};

export const getUserNotesByUserId = async (req: Request, res: Response) => {
  try {
    const id = req.params ? req.params.id : "";
    const notes = await Note.find({ user_id: id });

    return res.json(notes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unable to get user notes!",
    });
  }
};
