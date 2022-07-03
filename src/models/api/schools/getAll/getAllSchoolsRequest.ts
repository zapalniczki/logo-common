import { object, TypeOf, enum as zenum } from 'zod'
import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { admin } from '../../../db'

export const getAllSchoolsRequestSortingKeys = zenum(['NAME', 'CREATED_AT'])
export type GetAllSchoolsRequestSortingKeys = TypeOf<
  typeof getAllSchoolsRequestSortingKeys
>

export const getAllSchoolsRequestSortingQuery = getSortingQuery(
  getAllSchoolsRequestSortingKeys
)
export type GetAllSchoolsRequestSortingQuery = TypeOf<
  typeof getAllSchoolsRequestSortingQuery
>

export const getAllSchoolsRequestSchema = object({
  admin_id: admin.shape.id
})
export const getAllSchoolsRequest = getQueryParams(
  getAllSchoolsRequestSchema,
  getAllSchoolsRequestSortingKeys
)

export type GetAllSchoolsRequest = TypeOf<typeof getAllSchoolsRequest>
