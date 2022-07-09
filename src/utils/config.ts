import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  PORT: number | undefined;
  MONGO_URI: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  COOKIE_KEY_1: string;
  COOKIE_KEY_2: string;
}

type Config = Required<ENV>;

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    CLIENT_ID: process.env.CLIENT_ID ?? "",
    CLIENT_SECRET: process.env.CLIENT_SECRET ?? "",
    COOKIE_KEY_1: process.env.COOKIE_KEY_1 ?? "",
    COOKIE_KEY_2: process.env.COOKIE_KEY_2 ?? "",
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
