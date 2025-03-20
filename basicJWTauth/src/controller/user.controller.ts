import type { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../database/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = z
  .object({
    fullname: z.string().min(3, "Name should contain atleast 3 characters"),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

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
      res.send(400).json({ error: "User already exist" });
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

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET!, {
      expiresIn: "15d",
    });

    res.status(200).json({
      message: "User created successfully",
      yourToken: token,
      id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Zod Schema for validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

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
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
      expiresIn: "15d",
    });

    res.status(200).json({
      message: "User login successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<any> => {
  res.status(200).json({ message: "Heyy! GetMe" });
};
