import { isAbsoluteURL, toRGBArray } from '../src/String'

describe('String', () => {
  describe('isAbsoluteURL', () => {
    it('should validate absolute URL', () => {
      expect(isAbsoluteURL('https://google.com')).toBeTruthy();
      expect(isAbsoluteURL('http://google.com')).toBeTruthy();
      expect(isAbsoluteURL('ftp://google.com')).toBeTruthy();

      expect(isAbsoluteURL('google.com')).toBeFalsy();
      expect(isAbsoluteURL('/google.com')).toBeFalsy();
      expect(isAbsoluteURL('/foo/bar')).toBeFalsy();
    });
  });

  describe("toRGBArray", () => {
    it("should convert 'rgb(255, 255, 255)' to [255, 255, 255]", () => {
      const result = toRGBArray("rgb(255, 255, 255)");
      expect(result).toEqual([255, 255, 255]);
    });

    it("should convert 'rgb(0, 0, 0)' to [0, 0, 0]", () => {
      const result = toRGBArray("rgb(0, 0, 0)");
      expect(result).toEqual([0, 0, 0]);
    });

    it("should convert 'rgb(128, 128, 128)' to [128, 128, 128]", () => {
      const result = toRGBArray("rgb(128, 128, 128)");
      expect(result).toEqual([128, 128, 128]);
    });

    it("should convert 'rgb(255,0,0)' to [255, 0, 0]", () => {
      const result = toRGBArray("rgb(255,0,0)");
      expect(result).toEqual([255, 0, 0]);
    });
  });
})