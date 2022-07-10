import {
  getQueryParams,
  getSortingQuery,
  getUserSchema
} from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { quizInstance } from '../../../db'

export const getAllQuizInstancesRequestSortingKeys = zenum(['NAME', 'INDEX'])
export type GetAllQuizInstancesRequestSortingKeys = TypeOf<
  typeof getAllQuizInstancesRequestSortingKeys
>

export const getAllQuizInstancesRequestSortingQuery = getSortingQuery(
  getAllQuizInstancesRequestSortingKeys
)
export type GetAllQuizInstancesRequestSortingQuery = TypeOf<
  typeof getAllQuizInstancesRequestSortingQuery
>

const getAllQuizInstancesRequestSchema = getUserSchema(
  object({ quiz_id: quizInstance.shape.quiz_id })
)

export const getAllQuizInstancesRequest = getQueryParams(
  getAllQuizInstancesRequestSchema,
  getAllQuizInstancesRequestSortingKeys
)
export type GetAllQuizInstancesRequest = TypeOf<
  typeof getAllQuizInstancesRequest
>
