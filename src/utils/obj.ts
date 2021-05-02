export const omit = (obj: Record<string, any>, keys: string[]): any => {
  const result = {} as any
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  }
  return result
}

export const pick = (obj: Record<string, any>, keys: string[]): any => {
  const result = {} as any
  for (const key of keys) {
    if (keys.includes(key)) result[key] = obj[key]
  }
  return result
}
