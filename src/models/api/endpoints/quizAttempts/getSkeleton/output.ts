import { object, TypeOf, enum as zenum } from 'zod'
import { question } from '../../../models'

export const responseBody = object({
  index: question.shape.index,
  result: zenum(['NO_ATTEMPT', 'CORRECT', 'PARTIAL', 'FAIL'])
})

export type ResponseBody = TypeOf<typeof responseBody>
