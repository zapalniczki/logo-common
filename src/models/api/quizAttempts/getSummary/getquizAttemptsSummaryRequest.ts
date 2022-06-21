import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const getquizAttemptsSummaryRequest = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type GetquizAttemptsSummaryRequest = TypeOf<
  typeof getquizAttemptsSummaryRequest
>
