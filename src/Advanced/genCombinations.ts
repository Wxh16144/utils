
interface Options {
  /**
   * Must include
   * @default null
   */
  mustInclude?: string | string[]
}

/**
 * Generate all combinations of the given array
 * @author ChatGPT
 * @example
 * genCombinations(['a', 'b', 'c'])
 * // => ['a', 'b', 'ab', 'c', 'ac', 'bc', 'abc']
 */
function genCombinations(arr: string[], options: Options = {}): string[] {
  const { mustInclude } = options
  const len = arr.length
  const max = 1 << len // max is the number of all possible combinations

  const combinations = []

  for (let i = 1; i < max; i++) {
    let combination = ''
    for (let j = 0; j < len; j++) {
      if (i & (1 << j))
        combination += arr[j]
    }
    combinations.push(combination)
  }

  if (mustInclude) {
    const mustIncludeArr = Array.isArray(mustInclude) ? mustInclude : [mustInclude]
    return combinations.filter(combination =>
      mustIncludeArr.every(item => combination.includes(item)),
    )
  }

  return combinations
}

export default genCombinations
