import { isNil } from './isNil'

export const toArray = <T>(value: T | T[]): NonNullable<T>[] => {
  if (isNil(value)) {
    return []
  }

  return Array.isArray(value)
    ? value as NonNullable<T>[]
    : [value] as NonNullable<T>[]
}

