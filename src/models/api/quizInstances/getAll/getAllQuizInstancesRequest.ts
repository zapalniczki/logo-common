import { getQueryParams, getSortingQuery } from 'helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { quizInstance } from '../../../db'

const sortingKeys = zenum(['NAME', 'INDEX'])
const sortingQuery = getSortingQuery(sortingKeys)

const querySchema = object({
  quiz_id: quizInstance.shape.quiz_id,
  teacher_id: quizInstance.shape.teacher_id
})

export const getAllQuizInstancesRequest = getQueryParams(
  querySchema,
  sortingKeys
)
export type GetAllQuizInstancesRequest = TypeOf<
  typeof getAllQuizInstancesRequest
>
