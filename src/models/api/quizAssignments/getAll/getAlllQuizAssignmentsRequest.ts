import { enum as zenum, object, TypeOf } from 'zod'
import { student, teacher } from '../../../models'
import { getQueryParams, getSortingQuery } from '../../../utils'

const sortingKeys = zenum(['NAME', 'QUIZ_NAME', 'CREATED_AT', 'DUE_DATE'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional()
})

export const getAlllQuizAssignmentsRequest = getQueryParams(
  querySchema,
  sortingKeys
)
export type GetAlllQuizAssignmentsRequest = TypeOf<
  typeof getAlllQuizAssignmentsRequest
>
