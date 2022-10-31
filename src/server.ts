import https from "https";
import fs from "fs";
import sanitizedConfig from "./utils/config";
import app from "./app";
import { mongoConnect } from "./services/mongo";

const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

const PORT = sanitizedConfig.PORT;
const startServer = async () => {
  try {
    mongoConnect();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    throw new Error("Unable to connect to database!");
  }
};

startServer();
