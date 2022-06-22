import { object, number, TypeOf } from 'zod'
import { getListResponseBody } from 'helpers'
import { quiz } from '../../../db'

export const getAllQuizesResponseSchema = object({
  name: quiz.shape.name,
  category: quiz.shape.category,
  id: quiz.shape.id,
  introduction: quiz.shape.introduction,
  question_count: number(),
  instance_count: number().optional(),
  attempt_count: number().optional()
})

export const getAllQuizesResponse = getListResponseBody(
  getAllQuizesResponseSchema
)

export type GetAllQuizesResponse = TypeOf<typeof getAllQuizesResponse>