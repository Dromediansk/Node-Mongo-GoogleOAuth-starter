import express from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  getUserNotes,
} from "./controllers";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/:id/notes", getUserNotes);
usersRouter.post("/", createUser);

export default usersRouter;
