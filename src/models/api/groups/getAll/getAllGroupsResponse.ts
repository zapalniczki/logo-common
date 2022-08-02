import { enum as zenum, number, object, string, TypeOf } from 'zod'
import { getListResponseBody, getPermissionsSchema } from '../../../../helpers'
import { cohort, group } from '../../../db'

const getAllGroupsResponsePermission = zenum(['ADD'])

export type GetAllGroupsResponsePermission = TypeOf<
  typeof getAllGroupsResponsePermission
>

export const getAllGroupsResponseSchema = object({
  id: group.shape.id,
  name: string(),
  student_count: number(),
  cohort: cohort.shape.year,
  level: group.shape.level
})

export const getAllGroupsResponse = getPermissionsSchema(
  getListResponseBody(getAllGroupsResponseSchema),
  getAllGroupsResponsePermission
)

export type GetAllGroupsResponse = TypeOf<typeof getAllGroupsResponse>
