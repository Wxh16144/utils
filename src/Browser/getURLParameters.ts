type Obj = Record<string, any>

/**
 * 创建一个包含URL参数的对象
 * @param url 字符串 `default: window?.location?.search`
 * @returns 序列对象
 * @see https://www.30secondsofcode.org/js/s/get-url-parameters
 * @example
 * getURLParameters('google.com'); // {}
 * getURLParameters('http://url.com/page?name=Adam&surname=Smith');
 * // {name: 'Adam', surname: 'Smith'}
 */
const getURLParameters = (url = window?.location?.search): Obj =>
  ((url.match(/([^?=&]+)(=([^&]*))/g) || []) as unknown as Obj[])
    .reduce<Record<string, string>>(
      (a, v) => {
        (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1))
        return a
      },
      {},
    )

export default getURLParameters
