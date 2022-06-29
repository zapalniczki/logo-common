import { object, TypeOf } from 'zod'
import { group } from '../../../db'

export const deleteGroupRequest = object({
  group_id: group.shape.id
})

export type DeleteGroupRequest = TypeOf<typeof deleteGroupRequest>
