import { enum as zenum, object, TypeOf } from 'zod'
import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { school } from '../../../db'

export const getAllTeachersRequestSortingKeys = zenum([
  'SURNAME',
  'EMAIL',
  'EMAIL_CONFIRMED',
  'CREATED_AT'
])

export type GetAllTeachersRequestSortingKeys = TypeOf<
  typeof getAllTeachersRequestSortingKeys
>

export const getAllTeachersRequestSortingQuery = getSortingQuery(
  getAllTeachersRequestSortingKeys
)
export type GetAllTeachersRequestSortingQuery = TypeOf<
  typeof getAllTeachersRequestSortingQuery
>

export const getAllTeachersRequestSchema = object({
  school_id: school.shape.id
})

export const getAllTeachersRequest = getQueryParams(
  getAllTeachersRequestSchema,
  getAllTeachersRequestSortingKeys
)
export type GetAllTeachersRequest = TypeOf<typeof getAllTeachersRequest>
