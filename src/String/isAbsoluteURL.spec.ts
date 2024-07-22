import isAbsoluteURL from './isAbsoluteURL'

describe('isAbsoluteURL', () => {
  it('should validate absolute URL', () => {
    expect(isAbsoluteURL('https://google.com')).toBeTruthy()
    expect(isAbsoluteURL('http://google.com')).toBeTruthy()
    expect(isAbsoluteURL('ftp://google.com')).toBeTruthy()

    expect(isAbsoluteURL('google.com')).toBeFalsy()
    expect(isAbsoluteURL('/google.com')).toBeFalsy()
    expect(isAbsoluteURL('/foo/bar')).toBeFalsy()
  })
})
