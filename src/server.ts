import http from "http";
import sanitizedConfig from "./utils/config";
import app from "./app";
import { mongoConnect } from "./services/mongo";

const server = http.createServer(app);

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
