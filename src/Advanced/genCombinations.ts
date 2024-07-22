interface Options {
  /**
   * Must include
   * @default null
   */
  mustInclude?: string | string[]
  /**
   * Ignore order
   * @default true
   */
  ignoreOrder?: boolean
}

function permute(str: any): any {
  // Helper function to generate permutations of a string
  if (str.length <= 1) {
    return str
  }

  const perms = []
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (str.indexOf(char) !== i) {
      continue // Skip duplicate characters
    }
    const remainingString = str.slice(0, i) + str.slice(i + 1, str.length)
    for (const subPerm of permute(remainingString)) {
      perms.push(char + subPerm)
    }
  }

  return perms
}

/**
 * Generate all combinations of the given array
 * @author ChatGPT
 * @example
 * genCombinations(['a', 'b', 'c'])
 * // => ['a', 'b', 'ab', 'c', 'ac', 'bc', 'abc']
 */
function genCombinations(arr: string[], options: Options = {}): string[] {
  const { mustInclude, ignoreOrder = true } = options
  const len = arr.length
  const max = 1 << len

  let combinations = []

  for (let i = 1; i < max; i++) {
    let combination = ''
    for (let j = 0; j < len; j++) {
      if (i & (1 << j)) {
        combination += arr[j]
      }
    }

    // Generate permutations only if ignoreOrder is false
    if (!ignoreOrder) {
      for (const perm of permute(combination)) {
        combinations.push(perm)
      }
    }
    else {
      combinations.push(combination)
    }
  }

  if (mustInclude) {
    const mustIncludeArr = Array.isArray(mustInclude) ? mustInclude : [mustInclude]
    combinations = combinations.filter(combination =>
      mustIncludeArr.every(item => combination.includes(item)),
    )
  }

  return combinations
}

export default genCombinations
