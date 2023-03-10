// @ts-ignore

import {
  genCombinations,
  findBestMatch
} from "../src/Advanced";

describe('Advanced', () => {

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

  describe('findBestMatch', () => {
    it('jsdoc example should work', () => {
      const words = ['apple', 'banana', 'orange', 'pear'];
      const searchWord = 'ange';
      expect(findBestMatch(words, searchWord)).toEqual('orange');
    });

    it('should return undefined if the first argument is not an array or the second argument is not a string', () => {
      expect(findBestMatch([], undefined)).toBeUndefined();
      expect(findBestMatch(undefined, 'test')).toBeUndefined();
      expect(findBestMatch('test', 'test')).toBeUndefined();
      expect(findBestMatch([], {} as string)).toBeUndefined();
      expect(findBestMatch({} as string[], 'test')).toBeUndefined();
    });

    it('should return the exact match if it exists in the array', () => {
      const strArr = ['test', 'hello', 'world'];
      const targetStr = 'hello';
      expect(findBestMatch(strArr, targetStr)).toEqual(targetStr);
    });

    it('should return the longest match if no exact match exists', () => {
      const strArr1 = ['te', 'es', 'st', 'hel', 'lo', 'wor', 'ld'];
      const targetStr1 = 'hello';
      expect(findBestMatch(strArr1, targetStr1)).toEqual('hel');

      const strArr2 = ['ab', 'bc', 'cd', 'def', 'efg'];
      const targetStr2 = 'defgh';
      expect(findBestMatch(strArr2, targetStr2)).toEqual('def');
    });

    it('should return undefined if no match exists', () => {
      const strArr = ['test', 'hello', 'world'];
      const targetStr = 'apple';
      expect(findBestMatch(strArr, targetStr)).toBeUndefined();
    });

    it('should handle empty array input', () => {
      expect(findBestMatch([], 'test')).toBeUndefined();
      expect(findBestMatch([], '')).toBeUndefined();
      expect(findBestMatch([], ' ')).toBeUndefined();
    });

    it('should handle empty string input', () => {
      const strArr = ['test', 'hello', 'world'];
      expect(findBestMatch(strArr, '')).toEqual('test');
    });

    it('should handle edge case of target string containing only one character', () => {
      const strArr = ['a', 'b', 'c'];
      expect(findBestMatch(strArr, 'a')).toEqual('a');
      expect(findBestMatch(strArr, 'b')).toEqual('b');
      expect(findBestMatch(strArr, 'c')).toEqual('c');
      expect(findBestMatch(strArr, 'd')).toBeUndefined();
    });

    it('should handle edge case of string array containing only one item', () => {
      const strArr1 = ['test'];
      const targetStr1 = 'test';
      expect(findBestMatch(strArr1, targetStr1)).toEqual(targetStr1);

      const strArr2 = ['t', 'e', 's', 't'];
      const targetStr2 = 'test';
      expect(findBestMatch(strArr2, targetStr2)).toEqual('t');

      const strArr3 = ['te', 'st'];
      const targetStr3 = 'test';
      expect(findBestMatch(strArr3, targetStr3)).toEqual('te');
    });
  });
})