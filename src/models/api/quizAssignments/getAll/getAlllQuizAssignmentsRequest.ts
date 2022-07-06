import { enum as zenum, object, TypeOf } from 'zod'
import { getSortingQuery, getQueryParams } from '../../../../helpers'
import { student, teacher } from '../../../db'

export const getAlllQuizAssignmentsRequestSortingKeys = zenum([
  'NAME',
  'QUIZ_NAME',
  'CREATED_AT',
  'DUE_DATE'
])
export type GetAlllQuizAssignmentsRequestSortingKeys = TypeOf<
  typeof getAlllQuizAssignmentsRequestSortingKeys
>
export const getAlllQuizAssignmentsRequestSortingQuery = getSortingQuery(
  getAlllQuizAssignmentsRequestSortingKeys
)
type GetAlllQuizAssignmentsRequestSortingQuery = TypeOf<
  typeof getAlllQuizAssignmentsRequestSortingQuery
>

const getAlllQuizAssignmentsRequestSchema = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional()
})

export const getAlllQuizAssignmentsRequest = getQueryParams(
  getAlllQuizAssignmentsRequestSchema,
  getAlllQuizAssignmentsRequestSortingKeys
)
export type GetAlllQuizAssignmentsRequest = TypeOf<
  typeof getAlllQuizAssignmentsRequest
>
