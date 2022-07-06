import { enum as zenum, object, TypeOf } from 'zod'
import { getSortingQuery, getQueryParams } from '../../../../helpers'
import { student, teacher } from '../../../db'

export const getAllQuizAssignmentsRequestSortingKeys = zenum([
  'NAME',
  'QUIZ_NAME',
  'CREATED_AT',
  'DUE_DATE'
])
export type GetAllQuizAssignmentsRequestSortingKeys = TypeOf<
  typeof getAllQuizAssignmentsRequestSortingKeys
>
export const getAllQuizAssignmentsRequestSortingQuery = getSortingQuery(
  getAllQuizAssignmentsRequestSortingKeys
)
export type GetAllQuizAssignmentsRequestSortingQuery = TypeOf<
  typeof getAllQuizAssignmentsRequestSortingQuery
>

const getAllQuizAssignmentsRequestSchema = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional()
})

export const getAllQuizAssignmentsRequest = getQueryParams(
  getAllQuizAssignmentsRequestSchema,
  getAllQuizAssignmentsRequestSortingKeys
)
export type GetAllQuizAssignmentsRequest = TypeOf<
  typeof getAllQuizAssignmentsRequest
>
