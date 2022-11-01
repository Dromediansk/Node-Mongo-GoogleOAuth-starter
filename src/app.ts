import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import api from "./routes/api";
import path from "path";
import { isAuthenticated } from "./services/auth";
import authRouter from "./routes/auth/router";
import cookieSession from "cookie-session";
import sanitizedConfig from "./utils/config";
import passport from "passport";
import { handleGeneralError } from "./utils/error";

const app = express();

app.use(morgan("combined"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [sanitizedConfig.COOKIE_KEY_1, sanitizedConfig.COOKIE_KEY_2], // should be generated and hard to guess
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/api", isAuthenticated, api);

app.get("/", (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/*", (req: Request, res: Response) => {
  return res.status(404).send("404. The page was not found.");
});

app.use(handleGeneralError);

export default app;
