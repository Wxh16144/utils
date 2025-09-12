import findBestMatch from './findBestMatch'

describe('findBestMatch', () => {
  it('jsdoc example should work', () => {
    const words = ['apple', 'banana', 'orange', 'pear']
    const searchWord = 'ange'
    expect(findBestMatch(words, searchWord)).toEqual('orange')
  })

  it('should return undefined if the first argument is not an array or the second argument is not a string', () => {
    expect(findBestMatch([], undefined)).toBeUndefined()
    // @ts-expect-error Testing invalid input
    expect(findBestMatch(undefined, 'test')).toBeUndefined()
    // @ts-expect-error Testing invalid input
    expect(findBestMatch('test', 'test')).toBeUndefined()
    expect(findBestMatch([], {} as string)).toBeUndefined()
    expect(findBestMatch({} as string[], 'test')).toBeUndefined()
  })

  it('should return the exact match if it exists in the array', () => {
    const strArr = ['test', 'hello', 'world']
    const targetStr = 'hello'
    expect(findBestMatch(strArr, targetStr)).toEqual(targetStr)
  })

  it('should return the longest match if no exact match exists', () => {
    const strArr1 = ['te', 'es', 'st', 'hel', 'lo', 'wor', 'ld']
    const targetStr1 = 'hello'
    expect(findBestMatch(strArr1, targetStr1)).toEqual('hel')

    const strArr2 = ['ab', 'bc', 'cd', 'def', 'efg']
    const targetStr2 = 'defgh'
    expect(findBestMatch(strArr2, targetStr2)).toEqual('def')
  })

  it('should return undefined if no match exists', () => {
    const strArr = ['test', 'hello', 'world']
    const targetStr = 'apple'
    expect(findBestMatch(strArr, targetStr)).toBeUndefined()
  })

  it('should handle empty array input', () => {
    expect(findBestMatch([], 'test')).toBeUndefined()
    expect(findBestMatch([], '')).toBeUndefined()
    expect(findBestMatch([], ' ')).toBeUndefined()
  })

  it('should handle empty string input', () => {
    const strArr = ['test', 'hello', 'world']
    expect(findBestMatch(strArr, '')).toEqual('test')
  })

  it('should handle edge case of target string containing only one character', () => {
    const strArr = ['a', 'b', 'c']
    expect(findBestMatch(strArr, 'a')).toEqual('a')
    expect(findBestMatch(strArr, 'b')).toEqual('b')
    expect(findBestMatch(strArr, 'c')).toEqual('c')
    expect(findBestMatch(strArr, 'd')).toBeUndefined()
  })

  it('should handle edge case of string array containing only one item', () => {
    const strArr1 = ['test']
    const targetStr1 = 'test'
    expect(findBestMatch(strArr1, targetStr1)).toEqual(targetStr1)

    const strArr2 = ['t', 'e', 's', 't']
    const targetStr2 = 'test'
    expect(findBestMatch(strArr2, targetStr2)).toEqual('t')

    const strArr3 = ['te', 'st']
    const targetStr3 = 'test'
    expect(findBestMatch(strArr3, targetStr3)).toEqual('te')
  })
})
