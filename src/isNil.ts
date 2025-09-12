/**
 * 判断一个值是否为 null 或 undefined
 * @param value 要判断的值
 * @returns 是则返回 true，否则返回 false
 * @example
 * isNil(null) // => true
 * isNil(undefined) // => true
 * isNil(0) // => false
 */
export const isNil = (value: any): boolean => value === null || value === undefined
