import { number, object, TypeOf } from 'zod'
import { quizInstance } from '../../../models'
import { getListResponseBody } from '../../../utils'

export const getAllQuizInstancesResponseSchema = object({
  id: quizInstance.shape.id,
  name: quizInstance.shape.name,
  index: quizInstance.shape.index,
  created_at: quizInstance.shape.created_at,
  use_count: number()
})

export const getAllQuizInstancesResponse = getListResponseBody(
  getAllQuizInstancesResponseSchema
)

export type GetAllQuizInstancesResponse = TypeOf<
  typeof getAllQuizInstancesResponse
>
