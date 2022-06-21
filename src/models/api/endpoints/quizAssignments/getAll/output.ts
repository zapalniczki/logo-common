import { literal, number, object, TypeOf } from 'zod'
import { quiz, quizAssignment } from '../../../models'
import { getListResponseBody } from '../../../utils'

const baseSchema = object({
  quiz_name: quiz.shape.name,
  quiz_category: quiz.shape.category,
  id: quizAssignment.shape.id,
  name: quizAssignment.shape.name,
  mode: quizAssignment.shape.mode,
  due_date: quizAssignment.shape.due_date
})

const teacherSchema = baseSchema.extend({
  data_view: literal('TEACHER'),
  score_percentage: number(),
  completion_percentage: number()
})

export const teacherResponseBody = getListResponseBody(teacherSchema)
export type TeacherResponseBody = TypeOf<typeof teacherResponseBody>

const studentSchema = baseSchema.extend({
  data_view: literal('STUDENT'),
  attempt_count: number(),
  score_percentage: number()
})

export const studentResponseBody = getListResponseBody(studentSchema)
export type StudentResponseBody = TypeOf<typeof studentResponseBody>
