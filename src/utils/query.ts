export const splitQueryToArray = (
  queryParam: undefined | string | string[],
  separator = ','
): string[] => {
  if (!queryParam) return []
  if (Array.isArray(queryParam)) return queryParam
  return queryParam.split(separator)
}
