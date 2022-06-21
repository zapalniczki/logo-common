import { literal, number, object, TypeOf } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { quiz, quizAssignment } from '../../../db'

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

export const getAlllQuizAssignmentsTeacherResponse =
  getListResponseBody(teacherSchema)
export type GetAlllQuizAssignmentsTeacherResponse = TypeOf<
  typeof getAlllQuizAssignmentsTeacherResponse
>

const studentSchema = baseSchema.extend({
  data_view: literal('STUDENT'),
  attempt_count: number(),
  score_percentage: number()
})

export const getAlllQuizAssignmentsStudentResponse =
  getListResponseBody(studentSchema)
export type GetAlllQuizAssignmentsStudentResponse = TypeOf<
  typeof getAlllQuizAssignmentsStudentResponse
>
