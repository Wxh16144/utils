import { toHSLArray } from './toHSLArray'

export interface HSLObject {
  hue: number
  saturation: number
  lightness: number
}

/**
 * 将`hsl()`颜色字符串转换为具有每种颜色值的对象
 * @param hslStr hsl 字符串 `e.g. hsl(50, 10%, 10%)`
 * @returns 具有每种颜色值的对象
 * @see https://www.30secondsofcode.org/js/s/to-hsl-object
 * @example
 * toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }
 */
export function toHSLObject(hslStr: string): HSLObject {
  const [hue, saturation, lightness] = toHSLArray(hslStr)
  return { hue, saturation, lightness }
}
