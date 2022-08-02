import { enum as zenum, number, object, TypeOf } from 'zod'
import {
  getFiltersSchema,
  getListResponseBody,
  getPermissionsSchema
} from '../../../../helpers'
import { quiz, quizAssignment } from '../../../db'

export const getAllQuizAssignmentsResponseFilters = zenum(['MODE'])
export type GetAllQuizAssignmentsResponseFilters = TypeOf<
  typeof getAllQuizAssignmentsResponseFilters
>

export const getAllQuizAssignmentsResponsePermission = zenum(['ADD'])

export type GetAllQuizAssignmentsResponsePermission = TypeOf<
  typeof getAllQuizAssignmentsResponsePermission
>

export const getAllQuizAssignmentsResponseSchema = object({
  quiz_name: quiz.shape.name,
  quiz_category: quiz.shape.category,
  id: quizAssignment.shape.id,
  name: quizAssignment.shape.name,
  mode: quizAssignment.shape.mode,
  due_date: quizAssignment.shape.due_date,
  score_percentage: number(),
  // TEACHER
  completion_percentage: number().optional(),
  // STUDENT
  attempt_count: number().optional()
})

export type GetAllQuizAssignmentsResponseSchema = TypeOf<
  typeof getAllQuizAssignmentsResponseSchema
>

export const getAllQuizAssignmentsResponse = getFiltersSchema(
  getPermissionsSchema(
    getListResponseBody(getAllQuizAssignmentsResponseSchema),
    getAllQuizAssignmentsResponsePermission
  ),
  getAllQuizAssignmentsResponseFilters
)

export type GetAllQuizAssignmentsResponse = TypeOf<
  typeof getAllQuizAssignmentsResponse
>
