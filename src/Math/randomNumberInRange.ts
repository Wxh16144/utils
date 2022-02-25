/**
 * 生成指定范围内的随机整数。
 * @param min 最小值 `default: Number.MIN_SAFE_INTEGE`
 * @param max 最大值 `default: Number.MAX_SAFE_INTEGER`
 * @returns 随机整数
 * @see https://www.30secondsofcode.org/js/s/random-number-in-range
 * @example
 * randomNumberInRange(1, 2);  // 1.1517585535949995
 */
function randomNumberInRange(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
  return Math.random() * (max - min) + min
}

export default randomNumberInRange
