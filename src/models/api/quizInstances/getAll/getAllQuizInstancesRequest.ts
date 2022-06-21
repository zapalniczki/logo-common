import { DB_TABLES } from '@zapalniczki/logo-common'
import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from '../../../config'
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

export const getAllQuizInstancesRequest = getQueryParams(
  querySchema,
  sortingKeys
)
export type GetAllQuizInstancesRequest = TypeOf<
  typeof getAllQuizInstancesRequest
>

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
