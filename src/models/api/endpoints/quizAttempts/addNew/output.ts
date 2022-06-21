import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../models'

export const responseBody = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type ResponseBody = TypeOf<typeof responseBody>
