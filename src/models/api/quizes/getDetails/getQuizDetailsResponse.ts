import { TypeOf, enum as zenum, array } from 'zod'
import { quiz } from '../../../db'

const getQuizDetailsResponsePermission = zenum([
  'VIEW_QUESTIONS',
  'VIEW_VERSIONS',
  'USE'
])

export type GetQuizDetailsResponsePermission = TypeOf<
  typeof getQuizDetailsResponsePermission
>

export const getQuizDetailsResponseSchema = quiz.pick({
  name: true,
  introduction: true,
  category: true,
  id: true
})

export type GetQuizDetailsResponseSchema = TypeOf<
  typeof getQuizDetailsResponseSchema
>

export const getQuizDetailsResponse = getQuizDetailsResponseSchema.extend({
  permissions: array(getQuizDetailsResponsePermission)
})

export type GetQuizDetailsResponse = TypeOf<typeof getQuizDetailsResponse>
