import { Router } from "express";
import { login, logout, signup } from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/sign-up", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
