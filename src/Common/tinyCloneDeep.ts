type MaybeArray<T> = T | T[]

/**
 * 克隆一个值（仅支持对象和数组
 * @param 待克隆的值
 * @returns 克隆后的值
 * @example
 * const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
 * const obj2 = tinyCloneDeep(obj);
 */
function tinyCloneDeep<T = any>(val: MaybeArray<T>): MaybeArray<T> {
  if (Array.isArray(val))
    return cloneArrayDeep(val)
  else if (typeof val === 'object' && val !== null)
    return cloneObjectDeep(val)

  return val
}

function cloneObjectDeep<T = Record<string | number | symbol, any>>(val: T): T {
  if (Object.getPrototypeOf(val) === Object.prototype) {
    const res: Record<string | number | symbol, any> = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key in val)
      res[key] = tinyCloneDeep(val[key])

    return res
  }
  return val
}

function cloneArrayDeep<T = any>(val: T[]): T[] {
  return val.map(item => tinyCloneDeep(item)) as T[]
}

export default tinyCloneDeep
