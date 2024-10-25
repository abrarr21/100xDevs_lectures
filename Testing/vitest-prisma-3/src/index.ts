import express from "express";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

app.post("/sum", async (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const answer = a + b;

  await prismaClient.request.create({
    data: {
      a: a,
      b: b,
      answer: answer,
      type: "sum",
    },
  });
  res.json({ answer });
});

app.post("/multiply", async (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const answer = a * b;

  await prismaClient.request.create({
    data: {
      a: a,
      b: b,
      answer: answer,
      type: "multiply",
    },
  });
  res.json({ answer });
});
