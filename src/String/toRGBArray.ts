/**
 * 将`rgb()`颜色字符串转换为值数组。
 * @param rgbStr rgb颜色字符串
 * @returns rgb值数组
 * @see https://www.30secondsofcode.org/js/s/to-rgb-array
 * @example
 * torGBArray('rgb(255, 255, 255)'); // [255, 255, 255]
 */
function toRGBArray(rgbStr: string): number[] {
  return rgbStr.match(/\d+/g)!.map(Number)
}

export default toRGBArray
