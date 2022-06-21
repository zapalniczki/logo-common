import { object, TypeOf } from 'zod'
import { question, quizAttempt } from '../../../db'

export const getQuizAttemptQuestionRequest = object({
  quiz_attempt_id: quizAttempt.shape.id,
  question_index: question.shape.index
})

export type GetQuizAttemptQuestionRequest = TypeOf<
  typeof getQuizAttemptQuestionRequest
>
