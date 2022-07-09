declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
  }
}

declare namespace Express {
  interface User {
    id: string;
  }
}
