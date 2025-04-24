import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const userController = new UserController();

const userRouter = Router();

userRouter.get("/:id", userController.getUser);
// TODO
// userRouter.get("/:id/saved-books");
// userRouter.get("/:id/reviews");

userRouter.put("/:id", userController.updateUser);

export { userRouter };
