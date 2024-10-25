import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { app } from "../index";
import request from "supertest";
import clearDb from "./helper/reset-db";

describe("POST /sum", () => {
  beforeAll(async () => {
    console.log("Clearing database");
    await clearDb();
  });
  it("Should sum 2 numbers ", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: 1,
      b: 3,
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: 4, id: expect.any(Number) });
  });
});
