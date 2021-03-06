import { enum as zenum, object, TypeOf } from 'zod'
import {
  getQueryParams,
  getSortingQuery,
  getUserSchema
} from '../../../../helpers'

export const getAllQuizAssignmentsRequestSortingKeys = zenum([
  'NAME',
  'QUIZ_NAME',
  'CREATED_AT',
  'DUE_DATE'
])
export type GetAllQuizAssignmentsRequestSortingKeys = TypeOf<
  typeof getAllQuizAssignmentsRequestSortingKeys
>
export const getAllQuizAssignmentsRequestSortingQuery = getSortingQuery(
  getAllQuizAssignmentsRequestSortingKeys
)
export type GetAllQuizAssignmentsRequestSortingQuery = TypeOf<
  typeof getAllQuizAssignmentsRequestSortingQuery
>

export const getAllQuizAssignmentsRequestFilters = object({
  mode: zenum(['EXERCISE', 'HOMEWORK', 'TEST']).optional()
})
export type GetAllQuizAssignmentsRequestFilters = TypeOf<
  typeof getAllQuizAssignmentsRequestFilters
>

const getAllQuizAssignmentsRequestSchema = getUserSchema(
  getAllQuizAssignmentsRequestFilters
)

export const getAllQuizAssignmentsRequest = getQueryParams(
  getAllQuizAssignmentsRequestSchema,
  getAllQuizAssignmentsRequestSortingKeys
)
export type GetAllQuizAssignmentsRequest = TypeOf<
  typeof getAllQuizAssignmentsRequest
>
