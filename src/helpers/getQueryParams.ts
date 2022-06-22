import { ZodEnum, ZodObject, ZodRawShape } from 'zod'
import { paginator } from '../models'
import getSortingQuery from './getSortingQuery'

function getQueryParams<
  T extends ZodRawShape,
  U extends ZodEnum<[string, ...string[]]>
>(schema: ZodObject<T>, sortingKeys: U) {
  const sortingQuery = getSortingQuery(sortingKeys)
  const queryParams = schema.merge(paginator).merge(sortingQuery)

  return queryParams
}

export default getQueryParams
