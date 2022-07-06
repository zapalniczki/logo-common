import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { student, teacher } from '../../../db'

export const getStatisticsSubmissionsRequestSortingKeys = zenum([
  'COMPLETED_AT'
])
export type GetStatisticsSubmissionsRequestSortingKeys = TypeOf<
  typeof getStatisticsSubmissionsRequestSortingKeys
>

export const getStatisticsSubmissionsRequestSortingQuery = getSortingQuery(
  getStatisticsSubmissionsRequestSortingKeys
)
export type GetStatisticsSubmissionsRequestSortingQuery = TypeOf<
  typeof getStatisticsSubmissionsRequestSortingQuery
>

const querySchema = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional()
})

export const getStatisticsSubmissionsRequest = getQueryParams(
  querySchema,
  getStatisticsSubmissionsRequestSortingKeys
)
export type GetStatisticsSubmissionsRequest = TypeOf<
  typeof getStatisticsSubmissionsRequest
>
