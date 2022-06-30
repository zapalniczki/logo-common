import { number, object, enum as zenum, string, TypeOf, array } from 'zod'
import { getListResponseBody } from '../../../../helpers'
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

export const getAllGroupsResponse = getListResponseBody(
  getAllGroupsResponseSchema
).extend({
  permissions: array(getAllGroupsResponsePermission)
})

export type GetAllGroupsResponse = TypeOf<typeof getAllGroupsResponse>
