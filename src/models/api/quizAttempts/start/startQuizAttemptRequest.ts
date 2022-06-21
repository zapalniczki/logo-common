import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const startQuizAttemptRequest = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type StartQuizAttemptRequest = TypeOf<typeof startQuizAttemptRequest>
