import { enum as zenum, object, TypeOf } from 'zod'
import {
  getQueryParams,
  getSortingQuery,
  getUserSchema
} from '../../../../helpers'

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

const getAllGroupsRequestSchema = getUserSchema(object({}))

export const getAllGroupsRequest = getQueryParams(
  getAllGroupsRequestSchema,
  getAllGroupsRequestSortingKeys
)
export type GetAllGroupsRequest = TypeOf<typeof getAllGroupsRequest>
