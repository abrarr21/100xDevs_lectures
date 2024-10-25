import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import { app } from "../index";

describe("Post /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 3,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(4);
  });
  it("should return the sum of two negative numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: -1,
      b: -3,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(-4);
  });
  it("should return the sum of two zero numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 0,
      b: 0,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(0);
  });
  // it("should fail when a number is too big", async () => {
  //   const res = await request(app).post("/sum").send({
  //     a: 1000000000,
  //     b: 0,
  //   });
  //   expect(res.statusCode).toBe(422);
  //   expect(res.body.message).toBe("Sorry we dont support big numbers");
  // });
});

describe("test for multiply", () => {
  it("post /multiply", async () => {
    const res = await request(app).post("/multiply").send({
      a: 2,
      b: 3,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(6);
  });
});
