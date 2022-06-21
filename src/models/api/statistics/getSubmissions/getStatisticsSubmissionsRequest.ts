import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from '../../../../config'
import { DB_TABLES } from '../../../../constants'
import {
  getSortingQuery,
  getQueryParams,
  getSortingOrder
} from '../../../../helpers'
import { teacher, student } from '../../../db'

const sortingKeys = zenum(['COMPLETED_AT'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional()
})

export const getStatisticsSubmissionsRequest = getQueryParams(
  querySchema,
  sortingKeys
)
export type GetStatisticsSubmissionsRequest = TypeOf<
  typeof getStatisticsSubmissionsRequest
>

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
