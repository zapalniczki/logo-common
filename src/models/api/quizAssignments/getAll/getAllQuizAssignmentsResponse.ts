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
  score_percentage: number(),
  completion_percentage: number()
})

export const getAllQuizAssignmentsTeacherResponse = getListResponseBody(
  teacherSchema
).extend({ data_view: literal('TEACHER') })
export type GetAllQuizAssignmentsTeacherResponse = TypeOf<
  typeof getAllQuizAssignmentsTeacherResponse
>

const studentSchema = baseSchema.extend({
  attempt_count: number(),
  score_percentage: number()
})

export const getAllQuizAssignmentsStudentResponse = getListResponseBody(
  studentSchema
).extend({ data_view: literal('STUDENT') })

export type GetAllQuizAssignmentsStudentResponse = TypeOf<
  typeof getAllQuizAssignmentsStudentResponse
>
