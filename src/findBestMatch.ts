/**
 * 查找字符串数组中最长连续匹配项目
 * @author ChatGPT
 * @example
 * const words = ['apple', 'banana', 'orange', 'pear'];
 * const searchWord = 'ange';
 * const bestMatch = findBestMatch(words, searchWord);
 *
 * console.log(bestMatch); // Output: "orange"
 */
export function findBestMatch(strArr: string[], targetStr?: string) {
  if (!Array.isArray(strArr) || typeof targetStr !== 'string') {
    return undefined
  }

  let longestMatch = ''
  let currentMatch = ''

  for (let i = 0; i < strArr.length; i++) {
    const str = strArr[i]

    if (str.includes(targetStr)) {
      return str
    }

    let strIndex = 0
    let targetIndex = 0

    while (strIndex < str.length && targetIndex < targetStr.length) {
      if (str[strIndex] === targetStr[targetIndex]) {
        currentMatch += str[strIndex]
        targetIndex++
      }
      else {
        if (currentMatch.length > longestMatch.length) {
          longestMatch = currentMatch
        }

        currentMatch = ''
        targetIndex = 0
      }
      strIndex++
    }

    if (currentMatch.length > longestMatch.length) {
      longestMatch = currentMatch
    }

    currentMatch = ''
  }

  return longestMatch || undefined
}
