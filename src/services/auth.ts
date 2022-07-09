import cookieSession from "cookie-session";
import { Application, NextFunction, Request, Response } from "express";
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

export const setupPassportStrategy = () => {
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
    done(null, profile);
  };

  passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

  // Save the session to the cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Read the session from the cookie
  passport.deserializeUser((id: string, done) => {
    done(null, { id });
  });
};

export const initializeCookieSession = (app: Application) => {
  app.use(
    cookieSession({
      name: "session",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      keys: [sanitizedConfig.COOKIE_KEY_1, sanitizedConfig.COOKIE_KEY_2], // should be generated and hard to guess
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("current user is: ", req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must be logged in!",
    });
  }
  next();
};
