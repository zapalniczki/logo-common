import { object, TypeOf } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { quiz } from '../../../db'

export const getAllQuizesResponseSchema = object({
  name: quiz.shape.name,
  category: quiz.shape.category,
  id: quiz.shape.id
})

export const getAllQuizesResponse = getListResponseBody(
  getAllQuizesResponseSchema
)

export type GetAllQuizesResponse = TypeOf<typeof getAllQuizesResponse>
