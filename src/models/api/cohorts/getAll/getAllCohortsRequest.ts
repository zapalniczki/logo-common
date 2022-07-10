import { enum as zenum, object, TypeOf } from 'zod'
import {
  getQueryParams,
  getSortingQuery,
  getUserSchema
} from '../../../../helpers'

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

export const getAllCohortsRequestSchema = getUserSchema(object({}))

export const getAllCohortsRequest = getQueryParams(
  getAllCohortsRequestSchema,
  getAllCohortsRequestSortingKeys
)
export type GetAllCohortsRequest = TypeOf<typeof getAllCohortsRequest>
