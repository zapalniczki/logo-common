import { object, TypeOf } from 'zod'
import { quizAttempt } from '../../../models'

export const requestBody = object({
  student_id: quizAttempt.shape.student_id,
  quiz_assignment_id: quizAttempt.shape.quiz_assignment_id
})

export type RequestBody = TypeOf<typeof requestBody>
