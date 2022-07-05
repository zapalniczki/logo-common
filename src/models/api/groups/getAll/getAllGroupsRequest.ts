import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { school, teacher } from '../../../db'

export const getAllGroupsRequestSortingKeys = zenum(['LEVEL', 'LETTER'])
export type GetAllGroupsRequestSortingKeys = TypeOf<
  typeof getAllGroupsRequestSortingKeys
>

export const getAllGroupsRequestSortingQuery = getSortingQuery(
  getAllGroupsRequestSortingKeys
)
export type GetAllGroupsRequestSortingQuery = TypeOf<
  typeof getAllGroupsRequestSortingQuery
>

const getAllGroupsRequestSchema = object({
  school_id: school.shape.id.optional(),
  teacher_id: teacher.shape.id.optional()
})

export const getAllGroupsRequest = getQueryParams(
  getAllGroupsRequestSchema,
  getAllGroupsRequestSortingKeys
)
export type GetAllGroupsRequest = TypeOf<typeof getAllGroupsRequest>
