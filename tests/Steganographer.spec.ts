import { Steganographer } from '../src'
import { describe, it, expect } from 'vitest'

describe('Steganographer', () => {
  const steganographer = new Steganographer()

  it('should encode and decode text correctly', () => {
    const text = 'Hello World'
    const encoded = steganographer.encode(text)
    expect(encoded).not.toBe(text)
    // The encoded text should be invisible (mostly zero width chars) depending on defaults
    // Default is using \u200b, \u200c, \u200d
    expect(encoded).toMatch(/[\u200b\u200c\u200d]+/)

    const decoded = steganographer.decode(encoded)
    expect(decoded).toBe(text)
  })

  it('should handle empty strings', () => {
    expect(steganographer.encode('')).toBe('')
    expect(steganographer.decode('')).toBe('')
  })

  it('should extract hidden text from mixed content', () => {
    const hidden = steganographer.encode('secret')
    const mixed = `This is a ${hidden} message.`

    const extracted = steganographer.extract(mixed)
    expect(extracted).toBe(hidden)
    expect(steganographer.decode(extracted)).toBe('secret')
  })

  it('should work with custom options', () => {
    const custom = new Steganographer({
      zero: 'A',
      one: 'B',
      split: '|'
    })
    const text = 'Hi'
    const encoded = custom.encode(text)
    // Should contain As and Bs and |
    expect(encoded).toMatch(/^[AB|]+$/)
    expect(custom.decode(encoded)).toBe(text)
  })
})
