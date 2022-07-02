import express from "express";
import notesRouter from "./notes/router";
import usersRouter from "./users/router";

const api = express.Router();

api.use("/notes", notesRouter);
api.use("/users", usersRouter);

export default api;
