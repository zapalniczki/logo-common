import { number, object, enum as zenum, TypeOf, array } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { cohort } from '../../../db'

const getAllCohortsResponsePermission = zenum(['ADD'])

export type GetAllCohortsResponsePermission = TypeOf<
  typeof getAllCohortsResponsePermission
>

export const getAllCohortsResponseSchema = object({
  id: cohort.shape.id,
  year: cohort.shape.year,
  is_current: cohort.shape.is_current,
  group_count: number()
})

export const getAllCohortsResponse = getListResponseBody(
  getAllCohortsResponseSchema
).extend({
  permissions: array(getAllCohortsResponsePermission)
})

export type GetAllCohortsResponse = TypeOf<typeof getAllCohortsResponse>
