import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import api from "./routes/api";
import path from "path";
import { isAuthenticated } from "./services/auth";
import authRouter from "./routes/auth/router";
import passport from "passport";
import cookieSession from "cookie-session";
import sanitizedConfig from "./utils/config";

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id: string, done) => {
  done(null, { id });
});

const app: Application = express();

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
app.use("/api", api);

app.get("/secret", isAuthenticated, (req: Request, res: Response) => {
  return res.send("Your personal secret is 42!");
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;
