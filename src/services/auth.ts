import { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  Strategy,
  StrategyOptions,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import sanitizedConfig from "../utils/config";

const AUTH_OPTIONS: StrategyOptions = {
  callbackURL: "/auth/google/callback",
  clientID: sanitizedConfig.CLIENT_ID,
  clientSecret: sanitizedConfig.CLIENT_SECRET,
};

export const initializeAuthProcess = () => {
  /**
   * Wrapping up authorisation process:
   * Here we can verify credentials or user profile data with our db, etc.
   */
  const verifyCallback = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => {
    console.log("Google profile", profile);
    done(null, profile);
  };

  passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
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
