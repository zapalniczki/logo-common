import { TypeOf } from 'zod'
import { group } from '../../../db'

export const editGroupRequest = group
  .pick({
    level: true,
    letter: true,
    cohort_id: true
  })
  .partial()
  .merge(group.pick({ id: true }))

export type EditGroupRequest = TypeOf<typeof editGroupRequest>
