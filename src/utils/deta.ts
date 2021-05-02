import { Serializable, DetaBaseQuery, DetaBase } from 'deta'
import { flat } from './arr'
import asyncIterableToArray from './async-iterable-to-array'

export const fetchOne = async <T extends Serializable>(
  base: DetaBase,
  query: DetaBaseQuery
): Promise<T | null> => {
  const asyncIter = await base.fetch(query, 1)
  const [[result]] = await asyncIterableToArray(asyncIter)
  return result as T | null
}

export const fetchAll = async <T extends Serializable>(
  base: DetaBase,
  query: DetaBaseQuery
): Promise<T[]> => {
  const asyncIter = await base.fetch(query)
  const unflattened = await asyncIterableToArray(asyncIter)
  return flat(unflattened as T[][])
}
