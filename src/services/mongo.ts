import mongoose, { Error } from "mongoose";
import sanitizedConfig from "../utils/config";

const MONGO_URI = sanitizedConfig.MONGO_URI;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
  throw new Error("Connection to database failed!");
});

export const mongoConnect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_URI);
};

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
};
