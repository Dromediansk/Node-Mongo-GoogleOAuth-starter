import { Request, Response } from "express";
import passport from "passport";
import { AUTH_STRATEGY } from "./types";

export const authWithGoogle = passport.authenticate(AUTH_STRATEGY.Google, {
  failureRedirect: "/failure",
  successRedirect: "/",
});

export const handleGoogleCallbackSuccess = (req: Request, res: Response) => {
  console.log("Google logged us back!");
};

export const loginFailed = (req: Request, res: Response) => {
  res.send("Failed to log in!");
};

export const redirectToGoogleLogin = passport.authenticate(
  AUTH_STRATEGY.Google,
  {
    scope: ["profile", "email"],
  }
);

export const logout = (req: Request, res: Response) => {
  //Removes req.user and clears any logged in session
  req.logout({ keepSessionInfo: false }, (err) => {
    console.log("Something went wrong when logging out!");
  });
  res.redirect("/");
};
