import { number, object, string, TypeOf } from 'zod'
import { getListResponseBody } from 'helpers'
import { cohort, group } from '../../../db'

const schema = object({
  id: group.shape.id,
  name: string(),
  student_count: number(),
  cohort: cohort.shape.year,
  level: group.shape.level
})

export const getAllGroupsResponse = getListResponseBody(schema)

export type GetAllGroupsResponse = TypeOf<typeof getAllGroupsResponse>
