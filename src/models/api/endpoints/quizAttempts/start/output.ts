import { object, TypeOf } from 'zod'
import { question } from '../../../models'

export const responseBody = object({
  index: question.shape.index
})

export type ResponseBody = TypeOf<typeof responseBody>
