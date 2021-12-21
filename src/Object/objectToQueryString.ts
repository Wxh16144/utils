/**
 * 从给定对象的键值对生成一个查询字符串。
 * @param queryParameters 对象
 * @returns 查询字符串
 * @see https://www.30secondsofcode.org/js/s/object-to-query-string
 * @example
 * objectToQueryString({ page: '1', size: '2kg', key: undefined });
 * // '?page=1&size=2kg&key=undefined'
 */
const objectToQueryString = (queryParameters: Record<string, any>): string => {
  return queryParameters
    ? Object
      .entries(queryParameters)
      .reduce(
        (queryString, [key, val]) => {
          const symbol = queryString.length === 0 ? '?' : '&'
          return queryString += `${symbol}${key}=${val}`
        },
        '',
      )
    : ''
}

export default objectToQueryString
