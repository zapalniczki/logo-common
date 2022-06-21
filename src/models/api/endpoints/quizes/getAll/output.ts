import { object, number, TypeOf } from 'zod'
import { quiz } from '../../../models'
import { getListResponseBody } from '../../../utils'

export const schema = object({
  name: quiz.shape.name,
  category: quiz.shape.category,
  id: quiz.shape.id,
  introduction: quiz.shape.introduction,
  question_count: number(),
  instance_count: number().optional(),
  attempt_count: number().optional()
})

export const responseBody = getListResponseBody(schema)

export type ResponseBody = TypeOf<typeof responseBody>
