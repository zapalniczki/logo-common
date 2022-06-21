import { object, number, TypeOf } from 'zod'
import { quiz } from '../../../db'

export const getQuizCategoriesResponse = object({
  category: quiz.shape.category,
  quiz_count: number()
})

export type GetQuizCategoriesResponse = TypeOf<typeof getQuizCategoriesResponse>
