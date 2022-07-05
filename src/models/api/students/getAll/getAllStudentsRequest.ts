import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { school, teacher } from '../../../db'

export const getAllStudentsRequestSortingKeys = zenum([
  'SURNAME',
  'GROUP',
  'EMAIL',
  'EMAIL_CONFIRMED',
  'CREATED_AT'
])
export type GetAllStudentsRequestSortingKeys = TypeOf<
  typeof getAllStudentsRequestSortingKeys
>

export const getAllStudentsRequestSortingQuery = getSortingQuery(
  getAllStudentsRequestSortingKeys
)
export type GetAllStudentsRequestSortingQuery = TypeOf<
  typeof getAllStudentsRequestSortingQuery
>

const getAllStudentsRequestSchema = object({
  school_id: school.shape.id.optional(),
  teacher_id: teacher.shape.id.optional()
})

export const getAllStudentsRequest = getQueryParams(
  getAllStudentsRequestSchema,
  getAllStudentsRequestSortingKeys
)
export type GetAllStudentsRequest = TypeOf<typeof getAllStudentsRequest>
