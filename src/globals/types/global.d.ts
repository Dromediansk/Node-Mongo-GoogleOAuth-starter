declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
  }
}

declare namespace Express {
  interface User {
    id: string;
    name?: {
      familyName: string;
      givenName: string;
    };
    emails?: {
      value: string;
    }[];
  }
}
