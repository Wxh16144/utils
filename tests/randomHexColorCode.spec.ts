import { randomHexColorCode } from '../src'
import { describe, it, expect } from 'vitest'

describe('randomHexColorCode', () => {
  it('should return a hex color code with length 6 by default', () => {
    const hexColorCode = randomHexColorCode()
    expect(hexColorCode).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('should return a hex color code with length 3', () => {
    const hexColorCode = randomHexColorCode(3)
    expect(hexColorCode).toMatch(/^#[0-9a-f]{3}$/i)
  })

  it('should return a hex color code with length 8', () => {
    const hexColorCode = randomHexColorCode(8)
    expect(hexColorCode).toMatch(/^#[0-9a-f]{8}$/i)
  })
})
