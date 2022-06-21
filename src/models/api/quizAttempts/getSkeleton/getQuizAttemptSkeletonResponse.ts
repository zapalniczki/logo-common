import { object, TypeOf, enum as zenum } from 'zod'
import { question } from '../../../db'

export const getQuizAttemptSkeletonResponse = object({
  index: question.shape.index,
  result: zenum(['NO_ATTEMPT', 'CORRECT', 'PARTIAL', 'FAIL'])
})

export type GetQuizAttemptSkeletonResponse = TypeOf<
  typeof getQuizAttemptSkeletonResponse
>
