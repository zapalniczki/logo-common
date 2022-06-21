import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from 'config'
import { DB_TABLES } from 'constants'
import { getQueryParams, getSortingOrder, getSortingQuery } from 'helpers'
import { school } from '../../../db'

const sortingKeys = zenum(['SURNAME', 'EMAIL', 'EMAIL_CONFIRMED', 'CREATED_AT'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

export const querySchema = object({
  school_id: school.shape.id
})

export const getAllTeachersResponse = getQueryParams(querySchema, sortingKeys)
export type GetAllTeachersResponse = TypeOf<typeof getAllTeachersResponse>

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
