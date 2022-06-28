import { FastifyRequest } from "fastify";
import Post from "../models/post";

export const getPosts = async () => {
  try {
    const posts = await Post.find();

    return posts;
  } catch (err) {
    console.log("err", err);
  }
};

export const getPostByPostId = async (
  req: FastifyRequest<{ Params: { id: string } }>
) => {
  try {
    const postId = req.params ? req.params.id : "";
    const post = await Post.findById(postId);

    return post;
  } catch (err) {
    console.log("err", err);
  }
};

export const createPost = async (req: FastifyRequest) => {
  try {
    const post = new Post(req);
    const newPost = await post.save();

    return newPost;
  } catch (err) {
    console.log("err", err);
  }
};

export const deletePost = async (
  req: FastifyRequest<{ Params: { id: string } }>
) => {
  try {
    const postId = req.params ? req.params.id : "";
    const post = await Post.findByIdAndRemove(postId);

    return post;
  } catch (err) {
    console.log("err", err);
  }
};
