import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../models'

export const queryParams = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type QueryParams = TypeOf<typeof queryParams>
