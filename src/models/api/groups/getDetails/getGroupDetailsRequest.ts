import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { group } from '../../../db'

export const getGroupDetailsRequest = getUserSchema(
  object({ group_id: group.shape.id })
)

export type GetGroupDetailsRequest = TypeOf<typeof getGroupDetailsRequest>
