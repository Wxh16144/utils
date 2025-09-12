/**
 * 将`hsl()`颜色字符串转换为值数组。
 * @param hslStr hsl 字符串 `e.g. hsl(50, 10%, 10%)`
 * @returns hsl值数组
 * @see https://www.30secondsofcode.org/js/s/to-hsl-array
 * @example
 * toHSLArray('hsl(50, 10%, 10%)'); // [50, 10, 10]
 */
export function toHSLArray(hslStr: string): number[] {
  return hslStr.match(/\d+/g)!.map(Number)
}
