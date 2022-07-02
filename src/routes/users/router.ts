import express from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  getUserNotesByUserId,
} from "./controllers";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/:id/notes", getUserNotesByUserId);
usersRouter.post("/", createUser);

export default usersRouter;
