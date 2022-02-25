import randomIntegerInRange from './randomIntegerInRange'

/**
 * 生成`n`个指定范围内的随机整数数组
 * @param min 最小值 `default: 0`
 * @param max 最大值 `default: Number.MAX_SAFE_INTEGER`
 * @param n 长度 `default: 1`
 * @returns 数组
 * @see https://www.30secondsofcode.org/js/s/random-int-array-in-range
 * @example
 * randomIntArrayInRange();  // [172330561578449]
 * randomIntArrayInRange(0, 100, 5);  // [76, 23, 28, 8, 40]
 */
function randomIntArrayInRange(min = 0, max = Number.MAX_SAFE_INTEGER, n = 1): number[] {
  return Array.from({ length: n }, () => randomIntegerInRange(min, max))
}

export default randomIntArrayInRange
