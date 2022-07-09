import { Request, Response, Router } from "express";
import passport from "passport";
import {
  authWithGoogle,
  redirectToGoogleLogin,
  handleGoogleCallbackSuccess,
  loginFailed,
  logout,
} from "./controllers";

const authRouter = Router();

authRouter.get("/google", redirectToGoogleLogin);
authRouter.get("/google/callback", authWithGoogle, handleGoogleCallbackSuccess);
authRouter.get("/failure", loginFailed);
authRouter.get("/logout", logout);

export default authRouter;
