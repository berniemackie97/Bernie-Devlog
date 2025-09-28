import { describe, expect, it } from "vitest";
import romanize from "../../src/utils/romanize";

describe("romanize", () => {
  it("converts standard integers", () => {
    expect(romanize(1)).toBe("I");
    expect(romanize(4)).toBe("IV");
    expect(romanize(9)).toBe("IX");
    expect(romanize(42)).toBe("XLII");
  });

  it("handles hundreds and thousands", () => {
    expect(romanize(2025)).toBe("MMXXV");
  });

  it("returns NaN for invalid input", () => {
    expect(romanize(Number.NaN)).toBeNaN();
    expect(romanize("technonomicon" as unknown as number)).toBeNaN();
  });
});
