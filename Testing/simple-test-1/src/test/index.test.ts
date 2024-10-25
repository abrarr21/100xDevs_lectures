import { describe, expect, it } from "@jest/globals";
import { sum } from "../index";

describe("Testing for sum function", () => {
  it("adds 1 + 2 equals 3 ", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("adds -1 + -2 equals -3 ", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
