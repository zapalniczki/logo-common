import { object, number, TypeOf } from 'zod'
import { quiz } from '../../../models'

export const responseBody = object({
  category: quiz.shape.category,
  quiz_count: number()
})

export type ResponseBody = TypeOf<typeof responseBody>
