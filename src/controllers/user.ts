import { FastifyRequest } from "fastify";
import User from "../models/user";
import Note from "../models/note";
import { UserType } from "../globals/types/user";

export const createUser = async (
  req: FastifyRequest<{ Params: { user: UserType } }>
) => {
  try {
    const user = new User(req);
    const savedUser = await user.save();

    return savedUser;
  } catch (err) {
    console.log("err", err);
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (err) {
    console.log("err", err);
  }
};

export const getUserById = async (
  req: FastifyRequest<{ Params: { id: string } }>
) => {
  try {
    const userId = req.params ? req.params.id : "";
    const user = await User.findById(userId);

    return user;
  } catch (err) {
    console.log("err", err);
  }
};

export const getUserNotes = async (
  req: FastifyRequest<{ Params: { userId: string } }>
) => {
  try {
    const userId = req.params ? req.params.userId : "";
    const notes = await Note.find({ user_id: userId });

    return notes;
  } catch (err) {
    console.log("err", err);
  }
};
