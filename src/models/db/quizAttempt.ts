import { boolean, date, number, string, TypeOf } from 'zod'
import { quizAssignment } from './quizAssignment'
import { quizInstance } from './quizInstance'
import { student } from './student'
import { tableBase } from './tableBase'

export const quizAttempt = tableBase.extend({
  completed_at: date().nullable(),
  is_completed: boolean(),
  is_started: boolean(),
  display_name: string().nullable(),
  index: number(),
  quiz_assignment_id: quizAssignment.shape.id,
  quiz_instance_id: quizInstance.shape.id,
  started_at: date().nullable(),
  student_id: student.shape.id
})

export type QuizAttempt = TypeOf<typeof quizAttempt>
