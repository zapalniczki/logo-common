import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { getQueryParams, getSortingQuery } from '../../../utils'
import getSortingOrder from '../../../utils/getSortingOrder'
import { school, teacher } from '../../../models'

const sortingKeys = zenum([
  'SURNAME',
  'GROUP',
  'EMAIL',
  'EMAIL_CONFIRMED',
  'CREATED_AT'
])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  school_id: school.shape.id.optional(),
  teacher_id: teacher.shape.id.optional()
})

export const getAllStudentsRequest = getQueryParams(querySchema, sortingKeys)
export type GetAllStudentsRequest = TypeOf<typeof getAllStudentsRequest>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    default:
    case 'SURNAME':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.STUDENTS)}.surname ${sortOrder},
          ${sql(DB_TABLES.STUDENTS)}.name ${sortOrder}
      `

    case 'EMAIL':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.STUDENTS)}.email ${sortOrder}
      `

    case 'GROUP':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.GROUPS)}.level ${sortOrder},
          ${sql(DB_TABLES.GROUPS)}.letter ${sortOrder}
      `

    case 'CREATED_AT':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.STUDENTS)}.created_at ${sortOrder}
      `

    case 'EMAIL_CONFIRMED':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.STUDENTS)}.email_confirmed ${sortOrder}
      `
  }
}
