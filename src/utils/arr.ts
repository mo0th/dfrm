export const flat = <T>(arr: T[][]): T[] => {
  const result = []
  for (const sub_arr of arr) {
    result.push(...sub_arr)
  }
  return result
}
