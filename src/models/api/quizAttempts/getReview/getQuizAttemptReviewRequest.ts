import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const getQuizAttemptReviewRequest = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type GetQuizAttemptReviewRequest = TypeOf<
  typeof getQuizAttemptReviewRequest
>
