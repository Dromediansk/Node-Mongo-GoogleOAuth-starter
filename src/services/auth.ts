import { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  Strategy,
  StrategyOptions,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import User from "../models/user";
import { createUser } from "../routes/users/controllers";
import sanitizedConfig from "../utils/config";

interface SerializedUser {
  id: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: {
    value: string;
  }[];
}

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
    try {
      done(null, { id: user.id, name: user.name, emails: user.emails });
    } catch (err) {
      done(err);
    }
  });

  // Read the session from the cookie
  passport.deserializeUser(async (user: SerializedUser, done) => {
    try {
      const { id, name, emails } = user;

      const userExists = !!(await User.findOne({ googleId: id }));

      if (!userExists) {
        const newUser = { googleId: id, ...name, email: emails[0].value };
        await createUser(newUser);
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
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
