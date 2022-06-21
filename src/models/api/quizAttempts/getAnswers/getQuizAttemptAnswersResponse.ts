import { object, TypeOf } from 'zod'
import { answer, answerInstance } from '../../../db'

export const getQuizAttemptAnswersResponse = object({
  is_correct: answer.shape.is_correct,
  value: answerInstance.shape.value,
  id: answerInstance.shape.id,
  explanation: answerInstance.shape.explanation
})

export type GetQuizAttemptAnswersResponse = TypeOf<
  typeof getQuizAttemptAnswersResponse
>
