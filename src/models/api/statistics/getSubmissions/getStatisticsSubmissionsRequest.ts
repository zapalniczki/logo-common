import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { student, teacher } from '../../../db'

const sortingKeys = zenum(['COMPLETED_AT'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional()
})

export const getStatisticsSubmissionsRequest = getQueryParams(
  querySchema,
  sortingKeys
)
export type GetStatisticsSubmissionsRequest = TypeOf<
  typeof getStatisticsSubmissionsRequest
>
