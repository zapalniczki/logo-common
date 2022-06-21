import { TypeOf } from 'zod'
import { quiz } from '../../../db'

export const getQuizDetailsResponse = quiz.pick({
  name: true,
  introduction: true,
  category: true,
  id: true
})

export type GetQuizDetailsResponse = TypeOf<typeof getQuizDetailsResponse>
