import { enum as zenum, object, TypeOf } from 'zod'
import {
  getQueryParams,
  getSortingQuery,
  getUserSchema
} from '../../../../helpers'

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

export const getAllSchoolsRequestSchema = getUserSchema(object({}))

export const getAllSchoolsRequest = getQueryParams(
  getAllSchoolsRequestSchema,
  getAllSchoolsRequestSortingKeys
)

export type GetAllSchoolsRequest = TypeOf<typeof getAllSchoolsRequest>
