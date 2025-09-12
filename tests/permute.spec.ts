import { permute } from '../src'
import { describe, it, expect } from 'vitest'

describe('permute', () => {
  it('should handle an empty string', () => {
    expect(permute('')).toEqual([''])
  })

  it('should handle a single character string', () => {
    expect(permute('a')).toEqual(['a'])
  })

  it('should handle a two-character string', () => {
    expect(permute('ab')).toEqual(['ab', 'ba'])
  })

  it('should handle a three-character string', () => {
    expect(permute('abc')).toEqual(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
  })

  it('should handle duplicates in the string', () => {
    expect(permute('aab')).toEqual(['aab', 'aba', 'baa'])
  })
})
