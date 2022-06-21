import { number, object, TypeOf } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { quizInstance } from '../../../db'

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
