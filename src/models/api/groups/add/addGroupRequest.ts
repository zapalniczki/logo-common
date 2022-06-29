import { object, TypeOf } from 'zod'
import { group } from '../../../db'

export const addGroupRequest = object({
  level: group.shape.level,
  letter: group.shape.letter,
  cohort_id: group.shape.id
})

export type AddGroupRequest = TypeOf<typeof addGroupRequest>
