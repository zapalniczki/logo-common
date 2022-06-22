import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { school, teacher } from '../../../db'

const sortingKeys = zenum(['YEAR', 'IS_CURRENT'])
const getAllCohortsRequestSorting = getSortingQuery(sortingKeys)
export type GetAllCohortsRequestSorting = TypeOf<
  typeof getAllCohortsRequestSorting
>

const querySchema = object({
  school_id: school.shape.id.optional(),
  teacher_id: teacher.shape.id.optional()
})

export const getAllCohortsRequest = getQueryParams(querySchema, sortingKeys)
export type GetAllCohortsRequest = TypeOf<typeof getAllCohortsRequest>
