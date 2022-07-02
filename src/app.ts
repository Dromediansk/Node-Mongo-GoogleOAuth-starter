import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import api from "./routes/api";

const app = express();

app.use(morgan("combined"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

app.use(express.json());
app.use("/", api);

export default app;
