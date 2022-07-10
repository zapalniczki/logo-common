import { enum as zenum, object, TypeOf } from 'zod'
import {
  getQueryParams,
  getSortingQuery,
  getUserSchema
} from '../../../../helpers'

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

const getAllStudentsRequestSchema = getUserSchema(object({}))

export const getAllStudentsRequest = getQueryParams(
  getAllStudentsRequestSchema,
  getAllStudentsRequestSortingKeys
)
export type GetAllStudentsRequest = TypeOf<typeof getAllStudentsRequest>
