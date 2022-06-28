import sanitizedConfig from "./utils/config";
import app from "./app";
import { mongoConnect } from "./services/mongo";

const PORT = sanitizedConfig.PORT;

const startServer = async () => {
  try {
    mongoConnect();
    app.listen({ port: PORT });

    app.log.info(`Listening on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
