import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const getQuizAttemptSkeletonRequest = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type GetQuizAttemptSkeletonRequest = TypeOf<
  typeof getQuizAttemptSkeletonRequest
>
