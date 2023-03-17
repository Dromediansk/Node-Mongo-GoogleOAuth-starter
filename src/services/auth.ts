import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import passport from "passport";
import {
  Strategy,
  StrategyOptions,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import User from "../models/user";
import sanitizedConfig from "../utils/config";

/**
 * Wrapping up authorisation process:
 * Here we can verify credentials or user profile data with our db, etc.
 */
const verifyCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  User.findOne({ googleId: profile.id }).then((user) => {
    if (user) {
      return done(null, user);
    }

    try {
      const newUser = new User({
        googleId: profile.id,
        familyName: profile.name?.familyName || "",
        givenName: profile.name?.givenName || "",
        email: profile.emails ? profile.emails[0].value : "",
      });
      newUser.save();

      return done(null, newUser);
    } catch (error) {
      if (error instanceof Error) {
        return done(error);
      }
      console.log(error);
    }
  });
};

const AUTH_OPTIONS: StrategyOptions = {
  callbackURL: "/auth/google/callback",
  clientID: sanitizedConfig.CLIENT_ID,
  clientSecret: sanitizedConfig.CLIENT_SECRET,
};
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("current user is: ", req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;

  if (!isLoggedIn) {
    return res.status(401).json({
      message: "You must be logged in!",
    });
  }
  next();
};
