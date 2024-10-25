import { PrismaClient } from "@prisma/client";
import { mockDeep } from "vitest-mock-extended";

export const prismaClient = mockDeep<PrismaClient>();

// This is done above using deep mocking
// vi.mock('../db', () => {
//   prismClient: {
//     request: {
//       create: vi.fn(),
//       update: vi.fn(),
//       find: vi.fn(),
//       delete: vi.fn()
//     }
//   }
// })
