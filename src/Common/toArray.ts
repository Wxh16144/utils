/**
 * Converts a value to an array.
 * @param value any value
 * @returns always an array
 */
function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export default toArray
