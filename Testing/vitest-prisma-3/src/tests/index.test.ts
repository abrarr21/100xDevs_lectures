import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../index";

vi.mock("../db");

describe("POST /sum", () => {
  it("Should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 3,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(4);
  });
});

describe("POST /multiply", () => {
  it("Should return the multiply of two numbers", async () => {
    const res = await request(app).post("/multiply").send({
      a: 1,
      b: 3,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });
});
