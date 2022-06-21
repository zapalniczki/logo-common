import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const completeQuizAttemptRequest = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type CompleteQuizAttemptRequest = TypeOf<
  typeof completeQuizAttemptRequest
>
