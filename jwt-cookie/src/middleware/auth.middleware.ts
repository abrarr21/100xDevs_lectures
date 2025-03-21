import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import prisma from "../database/prisma";

const JWT = process.env.JWT_SECRET;

interface AuthRequest extends Request {
  user?: decodedToken;
}

interface decodedToken extends JwtPayload {
  id: string;
  email: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "Unauthorized - No token provided" });
    return;
  }

  let decoded: decodedToken;
  try {
    decoded = jwt.verify(token, JWT!) as decodedToken;
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid or expired token" });
    return;
  }

  // Ensure decoded is valid
  if (!decoded?.id) {
    res.status(401).json({ error: "Unauthorized - Invalid token payload" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, fullname: true, email: true },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
