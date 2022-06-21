import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../models'

export const requestQuery = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type RequestQuery = TypeOf<typeof requestQuery>
