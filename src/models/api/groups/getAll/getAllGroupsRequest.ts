import { object, TypeOf, enum as zenum } from 'zod'
import { sql } from '../../../../config'
import { DB_TABLES } from '../../../../constants'
import {
  getQueryParams,
  getSortingOrder,
  getSortingQuery
} from '../../../../helpers'
import { school, teacher } from '../../../db'

const sortingKeys = zenum(['LEVEL', 'LETTER'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  school_id: school.shape.id.optional(),
  teacher_id: teacher.shape.id.optional()
})

export const getAllGroupsRequest = getQueryParams(querySchema, sortingKeys)
export type GetAllGroupsRequest = TypeOf<typeof getAllGroupsRequest>

export function getSorting<T extends SortingQuery>(params: T) {
  const sortBy = params.sort_by
  const sortOrder = getSortingOrder(params.sort_order)

  switch (sortBy) {
    default:
    case 'LEVEL':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.GROUPS)}.level ${sortOrder}
      `

    case 'LETTER':
      return sql`
        ORDER BY
          ${sql(DB_TABLES.GROUPS)}.letter ${sortOrder}
      `
  }
}
