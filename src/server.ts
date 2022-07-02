import http from "http";
import sanitizedConfig from "./utils/config";
import app from "./app";
import { mongoConnect } from "./services/mongo";
import { boomify } from "@hapi/boom";

const PORT = sanitizedConfig.PORT;

const server = http.createServer(app);

const startServer = async () => {
  try {
    mongoConnect();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    throw boomify(err as Error);
  }
};

startServer();
