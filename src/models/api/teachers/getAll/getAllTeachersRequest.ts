import { enum as zenum, object, TypeOf } from 'zod'
import {
  getQueryParams,
  getSortingQuery,
  getUserSchema
} from '../../../../helpers'

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

export const getAllTeachersRequestSchema = getUserSchema(object({}))

export const getAllTeachersRequest = getQueryParams(
  getAllTeachersRequestSchema,
  getAllTeachersRequestSortingKeys
)
export type GetAllTeachersRequest = TypeOf<typeof getAllTeachersRequest>
