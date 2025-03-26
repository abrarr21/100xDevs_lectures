import express from "express";
import prisma from "./database/prisma";

const app = express();

app.get("/get", async (_req, res) => {
  const data = await prisma.user.findMany();
  res.json({ data });
});

app.post("/post", async (_req, res) => {
  await prisma.user.create({
    data: {
      username: Math.random().toString(),
      password: Math.random().toString(),
    },
  });
  res.json({ message: "post endpoint hit and usercreated" });
});

app.listen(6969, () => {
  console.log(`Server is running at PORT: 6969`);
});
