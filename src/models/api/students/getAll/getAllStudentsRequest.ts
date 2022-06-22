import { enum as zenum, object, TypeOf } from 'zod'
import { sql } from 'config'
import { DB_TABLES } from 'constants'
import { getSortingQuery, getQueryParams, getSortingOrder } from 'helpers'
import { school, teacher } from '../../../db'

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
