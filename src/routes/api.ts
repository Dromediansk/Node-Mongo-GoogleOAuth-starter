import { Router } from "express";
import authRouter from "./auth/router";
import notesRouter from "./notes/router";
import usersRouter from "./users/router";

const api = Router();

api.use("/auth", authRouter);
api.use("/notes", notesRouter);
api.use("/users", usersRouter);

export default api;
