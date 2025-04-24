import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";

const authController = new AuthController();

const authRouter = Router();

authRouter.post("/sign-in", authController.signIn);
authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-out", authController.signOut);

export { authRouter };
