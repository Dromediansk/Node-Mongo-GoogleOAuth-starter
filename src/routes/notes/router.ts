import express from "express";

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./controllers";

const notesRouter = express.Router();

notesRouter.get("/", getAllNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.post("/", createNote);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
