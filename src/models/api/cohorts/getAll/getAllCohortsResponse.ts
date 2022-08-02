import { enum as zenum, number, object, TypeOf } from 'zod'
import { getListResponseBody, getPermissionsSchema } from '../../../../helpers'
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

export const getAllCohortsResponse = getPermissionsSchema(
  getListResponseBody(getAllCohortsResponseSchema),
  getAllCohortsResponsePermission
)

export type GetAllCohortsResponse = TypeOf<typeof getAllCohortsResponse>
