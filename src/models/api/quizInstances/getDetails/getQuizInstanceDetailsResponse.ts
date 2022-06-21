import { object, TypeOf } from 'zod'
import { quiz, quizInstance } from '../../../db'

export const getQuizInstanceDetailsResponse = object({
  name: quizInstance.shape.name,
  index: quizInstance.shape.index,
  id: quizInstance.shape.id,
  quiz_id: quizInstance.shape.quiz_id,
  category: quiz.shape.category
})

export type GetQuizInstanceDetailsResponse = TypeOf<
  typeof getQuizInstanceDetailsResponse
>
