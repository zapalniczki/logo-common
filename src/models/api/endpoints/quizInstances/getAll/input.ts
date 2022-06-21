import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizInstance } from '../../../models'
import { getQueryParams, getSortingQuery } from '../../../utils'
import getSortingOrder from '../../../utils/getSortingOrder'

const sortingKeys = zenum(['NAME', 'INDEX'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  quiz_id: quizInstance.shape.quiz_id,
  teacher_id: quizInstance.shape.teacher_id
})

export const queryParams = getQueryParams(querySchema, sortingKeys)
export type QueryParams = TypeOf<typeof queryParams>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    default:
    case 'INDEX':
      return sql`
          ORDER BY
            ${sql(DB_TABLES.QUIZ_INSTANCES)}.index ${sortOrder}
        `

    case 'NAME':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.name ${sortOrder}
      `
  }
}
