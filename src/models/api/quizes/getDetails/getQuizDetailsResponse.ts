import { enum as zenum, number, TypeOf } from 'zod'
import { getPermissionsSchema } from '../../../../helpers'
import { quiz } from '../../../db'

const getQuizDetailsResponsePermission = zenum([
  'VIEW_QUESTIONS',
  'VIEW_INSTANCES',
  'USE'
])

export type GetQuizDetailsResponsePermission = TypeOf<
  typeof getQuizDetailsResponsePermission
>

export const getQuizDetailsResponseSchema = quiz
  .pick({
    name: true,
    introduction: true,
    category: true,
    id: true
  })
  .extend({
    instance_count: number(),
    question_count: number()
  })

export type GetQuizDetailsResponseSchema = TypeOf<
  typeof getQuizDetailsResponseSchema
>

export const getQuizDetailsResponse = getPermissionsSchema(
  getQuizDetailsResponseSchema,
  getQuizDetailsResponsePermission
)

export type GetQuizDetailsResponse = TypeOf<typeof getQuizDetailsResponse>
