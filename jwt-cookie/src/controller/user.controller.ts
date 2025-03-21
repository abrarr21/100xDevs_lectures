import type { Request, Response } from "express";
import { signupSchema, loginSchema } from "../utils/zodValidator";
import prisma from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_OPTION = {
  httpOnly: true,
  secure: process.env.NODE_ENV || "production" ? true : false,
  sameSite: "strict" as const,
} as const;

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ error: parsedData.error.format() });
      return;
    }

    const { fullname, email, password } = parsedData.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: "User already exist" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, COOKIE_OPTION);
    res.status(201).json({
      message: "User created successfully",
      token: token,
      fullname: newUser.fullname,
      email: newUser.email,
      id: newUser.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ error: parsedData.error.format() });
      return;
    }

    const { email, password } = parsedData.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("token", token, COOKIE_OPTION);
    res.json({
      message: "Login successful",
      email: user.email,
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.json({
    message: "Logout successfully",
  });
};
