import { permute } from './permute'

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

/**
 * Generate all combinations of the given array
 * @author ChatGPT
 * @example
 * genCombinations(['a', 'b', 'c'])
 * // => ['a', 'b', 'ab', 'c', 'ac', 'bc', 'abc']
 */
export function genCombinations(arr: string[], options: Options = {}): string[] {
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
    if (ignoreOrder) {
      combinations.push(combination)
    }
    else {
      permute(combination).forEach(perm => combinations.push(perm))
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