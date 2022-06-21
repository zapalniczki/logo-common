import { object, TypeOf, enum as zenum } from 'zod'
import { sql } from '../../../../config'
import { DB_TABLES } from '../../../../constants'
import {
  getQueryParams,
  getSortingOrder,
  getSortingQuery
} from '../../../../helpers'
import { school, teacher } from '../../../db'

const sortingKeys = zenum(['YEAR', 'IS_CURRENT'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  school_id: school.shape.id.optional(),
  teacher_id: teacher.shape.id.optional()
})

export const queryParams = getQueryParams(querySchema, sortingKeys)
export type QueryParams = TypeOf<typeof queryParams>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    default:
    case 'YEAR':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.COHORTS)}.year ${sortOrder}
      `

    case 'YEAR':
      return sql`
          ORDER BY
            ${sql(DB_TABLES.COHORTS)}.is_current ${sortOrder}
        `
  }
}
