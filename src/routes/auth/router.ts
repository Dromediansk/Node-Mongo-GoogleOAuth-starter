import { Router } from "express";
import {
  authenticateByGoogle,
  logout,
  redirectToCallbackUri,
} from "./controllers";

const authRouter = Router();

authRouter.get("/google", authenticateByGoogle);
authRouter.get("/google/callback", redirectToCallbackUri);
authRouter.get("/logout", logout);

export default authRouter;
