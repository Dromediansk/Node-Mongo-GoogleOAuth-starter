import { Request, Response } from "express";
import passport from "passport";

export const handleAuthenticatedWithGoogle = () => {
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  });
};

export const handleGoogleCallbackSuccess = (req: Request, res: Response) => {
  return res.send("Google send us back!");
};

export const loginFailed = (req: Request, res: Response) => {
  return res.send("Failed to log in!");
};

export const redirectToGoogleLogin = () => {
  console.log("hello");
  passport.authenticate("google", {
    scope: ["email"],
  });
};

export const logout = (req: Request, res: Response) => {};
