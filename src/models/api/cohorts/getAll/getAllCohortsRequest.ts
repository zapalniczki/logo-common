import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { school, teacher } from '../../../db'

export const getAllCohortsRequestSortingKeys = zenum(['YEAR', 'IS_CURRENT'])
export type GetAllCohortsRequestSortingKeys = TypeOf<
  typeof getAllCohortsRequestSortingKeys
>

export const getAllCohortsRequestSortingQuery = getSortingQuery(
  getAllCohortsRequestSortingKeys
)
export type GetAllCohortsRequestSortingQuery = TypeOf<
  typeof getAllCohortsRequestSortingQuery
>

export const getAllCohortsRequestSchema = object({
  school_id: school.shape.id.optional(),
  teacher_id: teacher.shape.id.optional()
})

export const getAllCohortsRequest = getQueryParams(
  getAllCohortsRequestSchema,
  getAllCohortsRequestSortingKeys
)
export type GetAllCohortsRequest = TypeOf<typeof getAllCohortsRequest>
