import { object, TypeOf } from 'zod'
import { answerInstance, question, quizAttempt } from '../../../db'

export const checkQuizAttemptAnswerRequest = object({
  question_index: question.shape.index,
  answer_instance_id: answerInstance.shape.id,
  quiz_attempt_id: quizAttempt.shape.id
})

export type CheckQuizAttemptAnswerRequest = TypeOf<
  typeof checkQuizAttemptAnswerRequest
>
