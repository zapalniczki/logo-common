import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { school } from '../../../models'
import { getQueryParams, getSortingQuery } from '../../../utils'
import getSortingOrder from '../../../utils/getSortingOrder'

const sortingKeys = zenum(['SURNAME', 'EMAIL', 'EMAIL_CONFIRMED', 'CREATED_AT'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

export const querySchema = object({
  school_id: school.shape.id
})

export const queryParams = getQueryParams(querySchema, sortingKeys)
export type QueryParams = TypeOf<typeof queryParams>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    default:
    case 'SURNAME':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.TEACHERS)}.surname ${sortOrder},
          ${sql(DB_TABLES.TEACHERS)}.name ${sortOrder}
      `

    case 'EMAIL':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.TEACHERS)}.email ${sortOrder}
      `

    case 'CREATED_AT':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.TEACHERS)}.created_at ${sortOrder}
      `

    case 'EMAIL_CONFIRMED':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.TEACHERS)}.email_confirmed ${sortOrder}
      `
  }
}
