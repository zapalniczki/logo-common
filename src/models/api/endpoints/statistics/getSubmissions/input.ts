import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { student, teacher } from '../../../models'
import { getQueryParams, getSortingQuery } from '../../../utils'
import getSortingOrder from '../../../utils/getSortingOrder'

const sortingKeys = zenum(['COMPLETED_AT'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional()
})

export const queryParams = getQueryParams(querySchema, sortingKeys)
export type QueryParams = TypeOf<typeof queryParams>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    case 'COMPLETED_AT':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at ${sortOrder}
      `

    default:
      return sql`
            ORDER BY
              ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at DESC
          `
  }
}
