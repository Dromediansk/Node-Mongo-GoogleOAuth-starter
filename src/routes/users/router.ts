import express from "express";

import { getAllUsers, getUserById, getUserNotesByUserId } from "./controllers";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/:id/notes", getUserNotesByUserId);

export default usersRouter;
