import { number, object, TypeOf } from 'zod'
import { quizInstance } from '../../../models'
import { getListResponseBody } from '../../../utils'

export const schema = object({
  id: quizInstance.shape.id,
  name: quizInstance.shape.name,
  index: quizInstance.shape.index,
  created_at: quizInstance.shape.created_at,
  use_count: number()
})

export const responseBody = getListResponseBody(schema)

export type ResponseBody = TypeOf<typeof responseBody>
