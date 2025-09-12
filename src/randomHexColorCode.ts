export type HexColorLength = 3 | 6 | 8

/**
 * 生成随机的十六进制颜色代码。
 * @param len 颜色代码长度 `default: 6`
 * @returns 十六进制颜色代码
 * @see https://www.30secondsofcode.org/js/s/random-hex-color-code
 * @example
 * randomHexColorCode();  // #f0f0f0
 * randomHexColorCode(3); // #f0f
 * randomHexColorCode(8); // #f0f0f0f0
 */
export function randomHexColorCode(len: HexColorLength = 6): string {
  const n = (Math.random() * 0xFFFFF * 1000000).toString(16)
  return `#${n.slice(0, len)}`
}
