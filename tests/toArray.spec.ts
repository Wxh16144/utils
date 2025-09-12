import { toArray } from '../src'
import { describe, it, expect } from 'vitest'

describe('toArray', () => {
  it('should convert a value to an array', () => {
    expect(toArray('a')).toEqual(['a'])
    expect(toArray(['a'])).toEqual(['a'])
  })
  it('should return an empty array for null', () => {
    expect(toArray(null)).toEqual([])
  })

  it('should return an empty array for undefined', () => {
    expect(toArray(undefined)).toEqual([])
  })

  it('should convert a single non-null value to an array', () => {
    expect(toArray(1)).toEqual([1])
    expect(toArray('hello')).toEqual(['hello'])
    expect(toArray({ key: 'value' })).toEqual([{ key: 'value' }])
  })

  it('should return the same array if an array is passed in', () => {
    const input = [1, 2, 3]
    expect(toArray(input)).toBe(input)
  })
})
