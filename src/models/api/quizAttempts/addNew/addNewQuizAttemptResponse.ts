import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const addNewQuizAttemptResponse = object({
  quiz_attempt_id: quizAttempt.shape.id
})

export type AddNewQuizAttemptResponse = TypeOf<typeof addNewQuizAttemptResponse>
