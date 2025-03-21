import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z.string().min(3, "Name must contain atleast 3 characters."),
    email: z.string().email(),
    password: z.string().min(6, "Password must contain atleast 6 character."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
