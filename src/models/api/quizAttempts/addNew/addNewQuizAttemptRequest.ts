import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../db'

export const addNewQuizAttemptRequest = object({
  student_id: quizAttempt.shape.student_id,
  quiz_assignment_id: quizAttempt.shape.quiz_assignment_id
})

export type AddNewQuizAttemptRequest = TypeOf<typeof addNewQuizAttemptRequest>
