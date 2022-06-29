import { object, TypeOf } from 'zod'
import { group } from '../../../db'

export const editGroupRequest = object({
  level: group.shape.level,
  letter: group.shape.letter,
  cohort_id: group.shape.id
})
  .partial()
  .merge(group.pick({ id: true }))

export type EditGroupRequest = TypeOf<typeof editGroupRequest>
