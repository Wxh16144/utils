import { isAbsoluteURL, randomHexColorCode, toRGBArray } from '../src/String'

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


  describe('randomHexColorCode', () => {
    test('should return a hex color code with length 6 by default', () => {
      const hexColorCode = randomHexColorCode()
      expect(hexColorCode).toMatch(/^#[0-9a-fA-F]{6}$/)
    })

    test('should return a hex color code with length 3', () => {
      const hexColorCode = randomHexColorCode(3)
      expect(hexColorCode).toMatch(/^#[0-9a-fA-F]{3}$/)
    })

    test('should return a hex color code with length 8', () => {
      const hexColorCode = randomHexColorCode(8)
      expect(hexColorCode).toMatch(/^#[0-9a-fA-F]{8}$/)
    })
  })


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