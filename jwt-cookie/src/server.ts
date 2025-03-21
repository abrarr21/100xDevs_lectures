import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./route/user.route";
import { authMiddleware } from "./middleware/auth.middleware";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", authMiddleware, (_req, res) => {
  res.json({ message: "Hello from bun" });
});

app.get("/home", authMiddleware, (_req, res) => {
  res.send("This is the home route from bun runtime");
});

app.use("/api/auth", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT}`);
});
