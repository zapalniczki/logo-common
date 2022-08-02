import { enum as zenum, number, object, TypeOf } from 'zod'
import { getPermissionsSchema } from '../../../../helpers'
import { quiz, quizInstance } from '../../../db'

export const getQuizInstanceDetailsPermission = zenum([
  'VIEW_QUESTIONS',
  'USE',
  'DELETE'
])

export type GetQuizInstanceDetailsPermission = TypeOf<
  typeof getQuizInstanceDetailsPermission
>

export const getQuizInstanceDetailsResponseSchema = object({
  name: quizInstance.shape.name,
  index: quizInstance.shape.index,
  id: quizInstance.shape.id,
  quiz_id: quizInstance.shape.quiz_id,
  category: quiz.shape.category
}).extend({ use_count: number() })

export const getQuizInstanceDetailsResponse = getPermissionsSchema(
  getQuizInstanceDetailsResponseSchema,
  getQuizInstanceDetailsPermission
)

export type GetQuizInstanceDetailsResponse = TypeOf<
  typeof getQuizInstanceDetailsResponse
>
