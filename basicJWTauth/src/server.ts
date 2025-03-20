import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./route/user.route";
import { authenticate } from "./middleware/auth.middleware";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", userRouter);

app.get("/", authenticate, (_req, res) => {
  res.send("Hello this / get route");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});
