import { boomify } from "@hapi/boom";
import { Request } from "express";
import Note from "../../models/note";
import User from "../../models/user";

export const getAllUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const createUser = async (req: Request) => {
  try {
    const user = new User(req);
    const savedUser = await user.save();

    return savedUser;
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const getUserById = async (req: Request) => {
  try {
    const id = req.params ? req.params.userId : "";
    const user = await User.findById(id);

    return user;
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const getUserNotes = async (req: Request) => {
  try {
    const userId = req.params ? req.params.userId : "";
    const notes = await Note.find({ user_id: userId });

    return notes;
  } catch (err) {
    throw boomify(err as Error);
  }
};
