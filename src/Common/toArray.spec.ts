import toArray from './toArray'

describe('toArray', () => {
  it('should convert a value to an array', () => {
    expect(toArray('a')).toEqual(['a'])
    expect(toArray(['a'])).toEqual(['a'])
  })
})
