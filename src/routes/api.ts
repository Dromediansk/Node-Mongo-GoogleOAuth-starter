import { Router } from "express";
import notesRouter from "./notes/router";
import usersRouter from "./users/router";

const api = Router();

api.use("/notes", notesRouter);
api.use("/users", usersRouter);

export default api;
