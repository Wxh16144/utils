import genCombinations from "./genCombinations";

describe("generateCombinations", () => {
  it("should return an empty array when input array is empty", () => {
    const arr = [];
    const combinations = genCombinations(arr);
    expect(combinations).toEqual([]);
  });

  it("should return all combinations without empty string when input array has one element", () => {
    const arr = ["a"];
    const combinations = genCombinations(arr);
    expect(combinations).toEqual(["a"]);
  });

  it("should return all combinations when input array has two elements", () => {
    const arr = ["a", "b"];
    const combinations = genCombinations(arr);
    expect(combinations).toEqual(["a", "b", "ab"]);
  });

  it("should return combinations that include the specified string when mustInclude is a string", () => {
    const arr = ["a", "b", "c"];
    const combinations = genCombinations(arr, { mustInclude: "a" });
    expect(combinations).toEqual(["a", "ab", "ac", "abc"]);
  });

  it("should return combinations that include all the specified strings when mustInclude is an array", () => {
    const arr = ["a", "b", "c", "d", "e"];
    const combinations = genCombinations(arr, { mustInclude: ["a", "d"] });
    expect(combinations).toEqual([
      "ad",
      "abd",
      "acd",
      "abcd",
      "ade",
      "abde",
      "acde",
      "abcde",
    ]);
  });
});