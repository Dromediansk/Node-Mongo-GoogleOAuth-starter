import { boomify } from "@hapi/boom";
import mongoose, { Error } from "mongoose";
import sanitizedConfig from "../utils/config";

const MONGO_URI = sanitizedConfig.MONGO_URI;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  throw boomify(err as Error);
});

export const mongoConnect = async () => {
  await mongoose.connect(MONGO_URI);
};

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
};
