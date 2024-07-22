import randomHexColorCode from "./randomHexColorCode"

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