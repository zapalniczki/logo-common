import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
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
