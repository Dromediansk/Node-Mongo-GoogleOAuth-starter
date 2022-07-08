import { Router } from "express";
import {
  handleAuthenticatedWithGoogle,
  redirectToGoogleLogin,
  handleGoogleCallbackSuccess,
  loginFailed,
  logout,
} from "./controllers";

const authRouter = Router();

authRouter.get("/google", redirectToGoogleLogin);
authRouter.get(
  "/google/callback",
  handleAuthenticatedWithGoogle,
  handleGoogleCallbackSuccess
);
authRouter.get("/failure", loginFailed);
authRouter.get("/logout", logout);

export default authRouter;
