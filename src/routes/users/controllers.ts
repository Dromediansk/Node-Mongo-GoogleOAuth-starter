import { boomify } from "@hapi/boom";
import { Request, Response } from "express";
import { UserType } from "../../globals/types/user";
import Note from "../../models/note";
import User from "../../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const createUser = async (user: UserType) => {
  try {
    const newUser = new User(user);
    await newUser.save();
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params ? req.params.id : "";
    const user = await User.findById(id);

    return res.json(user);
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const getUserNotesByUserId = async (req: Request, res: Response) => {
  try {
    const id = req.params ? req.params.id : "";
    const notes = await Note.find({ user_id: id });

    return res.json(notes);
  } catch (err) {
    throw boomify(err as Error);
  }
};
