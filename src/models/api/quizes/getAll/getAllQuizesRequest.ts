import { object, TypeOf, enum as zenum } from 'zod'
import { sql } from '../../../../config'
import { DB_TABLES } from '../../../../constants'
import {
  getSortingQuery,
  getQueryParams,
  getSortingOrder
} from '../../../../helpers'
import { teacher, quiz } from '../../../db'

const sortingKeys = zenum(['NAME'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  teacher_id: teacher.shape.id,
  quizCategory: quiz.shape.category.optional(),
  level: quiz.shape.level.optional()
})

export const getAllQuizesRequest = getQueryParams(querySchema, sortingKeys)
export type GetAllQuizesRequest = TypeOf<typeof getAllQuizesRequest>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    default:
    case 'NAME':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.QUIZES)}.name ${sortOrder}
      `
  }
}

export const getFiltersQuery = (query: GetAllQuizesRequest) => {
  if (query.quizCategory && query.level) {
    return sql`
      WHERE
        ${sql(DB_TABLES.QUIZES)}.category = ${query.quizCategory}
        AND
        ${sql(DB_TABLES.QUIZES)}.level = ${query.level}
    `
  } else if (query.quizCategory) {
    return sql`
      WHERE
        ${sql(DB_TABLES.QUIZES)}.category = ${query.quizCategory}
    `
  } else if (query.level) {
    return sql`
      WHERE
        ${sql(DB_TABLES.QUIZES)}.level = ${query.level}
    `
  }

  return sql``
}
