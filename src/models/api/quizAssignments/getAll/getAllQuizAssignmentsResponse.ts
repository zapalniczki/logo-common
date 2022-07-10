import { number, object, TypeOf } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { quiz, quizAssignment } from '../../../db'

export const getAllQuizAssignmentsStudentResponseSchema = object({
  quiz_name: quiz.shape.name,
  quiz_category: quiz.shape.category,
  id: quizAssignment.shape.id,
  name: quizAssignment.shape.name,
  mode: quizAssignment.shape.mode,
  due_date: quizAssignment.shape.due_date,
  score_percentage: number(),
  completion_percentage: number().optional(),
  attempt_count: number().optional()
})

export type GetAllQuizAssignmentsStudentResponseSchema = TypeOf<
  typeof getAllQuizAssignmentsStudentResponseSchema
>

export const getAllQuizAssignmentsResponse = getListResponseBody(
  getAllQuizAssignmentsStudentResponseSchema
)

export type GetAllQuizAssignmentsResponse = TypeOf<
  typeof getAllQuizAssignmentsResponse
>
