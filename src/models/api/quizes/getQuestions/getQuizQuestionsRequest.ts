import { object, TypeOf } from 'zod'
import { quiz } from '../../../db'

export const getQuizQuestionsRequest = object({
  quiz_id: quiz.shape.id
})

export type GetQuizQuestionsRequest = TypeOf<typeof getQuizQuestionsRequest>
