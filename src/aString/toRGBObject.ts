import toRGBArray from './toRGBArray'

export interface RGBObject {
  red: number
  green: number
  blue: number
}

/**
 * 将`rgb()`颜色字符串转换为具有每种颜色值的对象
 * @param rgbStr rgb 字符串 `e.g. rgb(255, 255, 255)`
 * @returns 具有每种颜色值的对象
 * @see https://www.30secondsofcode.org/js/s/to-rgb-object
 * @example
 * toRGBObject('rgb(255, 255, 255)');  // { red: '255', green: '255', blue: '255' }
 */
function toRGBObject(rgbStr: string): RGBObject {
  const [red, green, blue] = toRGBArray(rgbStr)
  return { red, green, blue }
}

export default toRGBObject
