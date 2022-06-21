import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const getQuizAttemptDetailsRequest = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type GetQuizAttemptDetailsRequest = TypeOf<
  typeof getQuizAttemptDetailsRequest
>
