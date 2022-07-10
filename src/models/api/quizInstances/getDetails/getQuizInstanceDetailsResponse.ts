import { object, TypeOf, enum as zenum, array } from 'zod'
import { quiz, quizInstance } from '../../../db'

const getQuizInstanceDetailsPermission = zenum([
  'VIEW_QUESTIONS',
  'USE',
  'DELETE'
])

export const getQuizInstanceDetailsResponseSchema = object({
  name: quizInstance.shape.name,
  index: quizInstance.shape.index,
  id: quizInstance.shape.id,
  quiz_id: quizInstance.shape.quiz_id,
  category: quiz.shape.category
})

export const getQuizInstanceDetailsResponse =
  getQuizInstanceDetailsResponseSchema.extend({
    permissions: array(getQuizInstanceDetailsPermission)
  })

export type GetQuizInstanceDetailsResponse = TypeOf<
  typeof getQuizInstanceDetailsResponse
>
