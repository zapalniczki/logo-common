import { object, TypeOf } from 'zod'
import { quizAttempt, question } from '../../../models'

export const queryParams = object({
  quiz_attempt_id: quizAttempt.shape.id,
  question_index: question.shape.index
})

export type QueryParams = TypeOf<typeof queryParams>
