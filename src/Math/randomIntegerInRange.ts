/**
 * 生成指定范围内的随机整数。
 * @param min 最小值 `default: Number.MIN_SAFE_INTEGE`
 * @param max 最大值 `default: Number.MAX_SAFE_INTEGER`
 * @returns 随机整数
 * @see https://www.30secondsofcode.org/js/s/random-integer-in-range
 * @example
 * randomIntegerInRange();  // 0
 */
function randomIntegerInRange(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default randomIntegerInRange
