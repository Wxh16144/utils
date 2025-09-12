import isNil from './isNil'

const toArray = <T>(value: T | T[]): NonNullable<T>[] => {
  if (isNil(value)) {
    return []
  }

  return Array.isArray(value)
    ? value as NonNullable<T>[]
    : [value] as NonNullable<T>[]
}

export default toArray
