/**
 * 判断字符串是否是一个绝对地址
 * @param str 待判断字符串
 * @returns 是否是绝对地址
 * @see https://www.30secondsofcode.org/js/s/is-absolute-url
 * @example
 * isAbsoluteURL('https://google.com'); // true
 * isAbsoluteURL('ftp://www.myserver.net'); // true
 * isAbsoluteURL('/foo/bar'); // false
 */
export function isAbsoluteURL(str: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/.test(str)
}
