import { FastifyRequest } from "fastify";
import User from "../models/user";
import Post from "../models/post";

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

export const getUserPosts = async (
  req: FastifyRequest<{ Params: { userId: string } }>
) => {
  try {
    const userId = req.params ? req.params.userId : "";
    const posts = await Post.find({ user_id: userId });

    return posts;
  } catch (err) {
    console.log("err", err);
  }
};
