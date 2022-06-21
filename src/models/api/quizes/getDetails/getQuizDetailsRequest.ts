import { object, TypeOf } from 'zod'
import { quiz } from '../../../db'

export const getQuizDetailsRequest = object({
  quiz_id: quiz.shape.id
})

export type GetQuizDetailsRequest = TypeOf<typeof getQuizDetailsRequest>
