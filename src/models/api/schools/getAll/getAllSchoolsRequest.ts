import { object, TypeOf, enum as zenum } from 'zod'
import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { admin } from '../../../db'

export const getAllSchoolsRequestSortingKeys = zenum(['NAME'])

const sortingQuery = getSortingQuery(getAllSchoolsRequestSortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

export const getAllSchoolsRequestSchema = object({
  admin_id: admin.shape.id
})
export const getAllSchoolsRequest = getQueryParams(
  getAllSchoolsRequestSchema,
  getAllSchoolsRequestSortingKeys
)

export type GetAllSchoolsRequest = TypeOf<typeof getAllSchoolsRequest>
