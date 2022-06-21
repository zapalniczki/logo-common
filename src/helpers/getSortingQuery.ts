import { object, ZodEnum } from 'zod'
import { sortingOrder } from '../models'

function getSortingQuery<T extends ZodEnum<[string, ...string[]]>>(
  sortingKeys: T
) {
  const sortingQuery = object({
    sort_by: sortingKeys.optional(),
    sort_order: sortingOrder
  })

  return sortingQuery
}

export default getSortingQuery
