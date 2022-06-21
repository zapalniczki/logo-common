import { object, TypeOf } from 'zod'
import { question, quizAttempt } from '../../../db'

export const getQuizAttemptAnswersRequest = object({
  quiz_attempt_id: quizAttempt.shape.id,
  question_index: question.shape.index
})

export type GetQuizAttemptAnswersRequest = TypeOf<
  typeof getQuizAttemptAnswersRequest
>
