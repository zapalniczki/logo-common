import { object, TypeOf } from 'zod'
import { group } from '../../../db'

export const getGroupDetailsRequest = object({
  group_id: group.shape.id
})

export type GetGroupDetailsRequest = TypeOf<typeof getGroupDetailsRequest>
