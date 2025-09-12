import { genCombinations } from '../src'
import { describe, it, expect } from 'vitest'

describe('generateCombinations', () => {
  it('should return an empty array when input array is empty', () => {
    const arr = [] as string[]
    const combinations = genCombinations(arr)
    expect(combinations).toEqual([])
  })

  it('should return all combinations without empty string when input array has one element', () => {
    const arr = ['a']
    const combinations = genCombinations(arr)
    expect(combinations).toEqual(['a'])
  })

  it('should return all combinations when input array has two elements', () => {
    const arr = ['a', 'b']
    const combinations = genCombinations(arr)
    expect(combinations).toEqual(['a', 'b', 'ab'])
  })

  it('should return combinations that include the specified string when mustInclude is a string', () => {
    const arr = ['a', 'b', 'c']
    const combinations = genCombinations(arr, { mustInclude: 'a' })
    expect(combinations).toEqual(['a', 'ab', 'ac', 'abc'])
  })

  it('should return combinations that include all the specified strings when mustInclude is an array', () => {
    const arr = ['a', 'b', 'c', 'd', 'e']
    const combinations = genCombinations(arr, { mustInclude: ['a', 'd'] })
    expect(combinations).toEqual([
      'ad',
      'abd',
      'acd',
      'abcd',
      'ade',
      'abde',
      'acde',
      'abcde',
    ])
  })

  describe('ignoreOrder option', () => {
    it('should generate unique combinations ignoring order when ignoreOrder is true', () => {
      expect(genCombinations(['a', 'b', 'a'], { ignoreOrder: true })).toEqual([
        'a',
        'b',
        'ab',
        'a',
        'aa',
        'ba',
        'aba',
      ])
    })

    it('should not ignore order when ignoreOrder is false', () => {
      expect(genCombinations(['a', 'b', 'a'], { ignoreOrder: false })).toEqual([
        'a',
        'b',
        'ab',
        'ba',
        'a',
        'aa',
        'ba',
        'ab',
        'aba',
        'aab',
        'baa',
      ])
    })

    it('should generate all combinations ignoring order when ignoreOrder is false', () => {
      expect(genCombinations(['a', 'b', 'c'], { ignoreOrder: false })).toEqual([
        'a',
        'b',
        'ab',
        'ba',
        'c',
        'ac',
        'ca',
        'bc',
        'cb',
        'abc',
        'acb',
        'bac',
        'bca',
        'cab',
        'cba',
      ])
    })

    it('should generate unique combinations ignoring order when ignoreOrder is true and mustInclude is a string', () => {
      expect(genCombinations(['a', 'b', 'a'], { ignoreOrder: true, mustInclude: 'b' })).toEqual([
        'b',
        'ab',
        'ba',
        'aba',
      ])
    })

    it('should generate all combinations when ignoreOrder is false and mustInclude is a string', () => {
      expect(genCombinations(['a', 'b', 'c'], { ignoreOrder: false, mustInclude: 'b' })).toEqual([
        'b',
        'ab',
        'ba',
        'bc',
        'cb',
        'abc',
        'acb',
        'bac',
        'bca',
        'cab',
        'cba',
      ])
    })
  })
})
