import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import api from "./routes/api";
import path from "path";
import { isAuthenticated } from "./services/auth";

const app: Application = express();

app.use(morgan("combined"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/auth/google", (req: Request, res: Response) => {});

app.get("/auth/google/callback", (req: Request, res: Response) => {});

app.get("/auth/logout", (req: Request, res: Response) => {});

app.get("/secret", isAuthenticated, (req: Request, res: Response) => {
  return res.send("Your personal secret is 42!");
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.use("/api", api);

export default app;
