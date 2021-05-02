export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = {} as T
  for (const key in obj) {
    if (!keys.includes(key as any)) {
      result[key] = obj[key]
    }
  }
  return result
}

export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (keys.includes(key)) result[key] = obj[key]
  }
  return result
}
