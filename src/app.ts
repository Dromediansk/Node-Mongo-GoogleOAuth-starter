import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import api from "./routes/api";

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

app.get("/", (req, res) => {
  return res.send("Hello there");
});
app.use("/api", api);

export default app;
