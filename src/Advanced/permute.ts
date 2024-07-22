/**
 * Generates all unique permutations of a given string.
 * @param {string} str - The string to permute.
 * @returns {string[]} An array containing all unique permutations of the input string.
 */
function permute(str: string): string[] {
  if (str.length <= 1) {
    return [str]
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

export default permute
