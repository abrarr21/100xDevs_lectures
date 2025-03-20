import { Router } from "express";
import { getMe, login, logout, signup } from "../controller/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/sign-up", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/getMe", authenticate, getMe);

export default userRouter;
