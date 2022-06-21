import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizAssignment, student } from '../../../models'
import { getQueryParams, getSortingQuery } from '../../../utils'
import getSortingOrder from '../../../utils/getSortingOrder'

const sortingKeys = zenum(['DISPLAY_NAME', 'INDEX'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  quiz_assignment_id: quizAssignment.shape.id,
  student_id: student.shape.id
})

export const queryParams = getQueryParams(querySchema, sortingKeys)
export type QueryParams = TypeOf<typeof queryParams>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    case 'DISPLAY_NAME':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.display_name ${sortOrder}
      `

    case 'INDEX':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.index ${sortOrder}
      `

    default:
      return sql`
        ORDER BY
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.index DESC
      `
  }
}
