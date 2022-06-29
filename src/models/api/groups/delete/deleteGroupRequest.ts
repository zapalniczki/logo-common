import { object, TypeOf } from 'zod'
import { group } from '../../../db'

export const deleteGroupRequest = object({
  cohort_id: group.shape.cohort_id
})

export type DeleteGroupRequest = TypeOf<typeof deleteGroupRequest>
