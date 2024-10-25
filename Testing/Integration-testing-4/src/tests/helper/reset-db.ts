import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearDb = async () => {
  await prisma.$transaction([prisma.request.deleteMany()]);
};

export default clearDb;
