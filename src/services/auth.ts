import { NextFunction, Request, Response } from "express";

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isLoggedIn = true; // TODO

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must be logged in!",
    });
  }
  next();
};
