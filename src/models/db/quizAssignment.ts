import { boolean, date, number, string, TypeOf } from 'zod'
import { quizAssignmentMode } from '../dbEnums'
import { group } from './group'
import { quiz } from './quiz'
import { quizInstance } from './quizInstance'
import { tableBase } from './tableBase'
import { teacher } from './teacher'

export const quizAssignment = tableBase.extend({
  allowed_question_attempts: number().int().positive(),
  allowed_quiz_attempts: number().int().positive().nullable(),
  pass_threshold: number().int().positive().max(100).nullable(),
  group_id: group.shape.id,
  name: string(),
  quiz_id: quiz.shape.id,
  quiz_instance_id: quizInstance.shape.id.nullable(),
  has_been_quiz_instance_id_randomly_selected: boolean(),
  teacher_id: teacher.shape.id,
  should_randomize_quiz_instance_id: boolean(),
  mode: quizAssignmentMode,
  attempt_time: number().int().positive().nullable(),
  due_date: date()
})

export type QuizAssignment = TypeOf<typeof quizAssignment>
