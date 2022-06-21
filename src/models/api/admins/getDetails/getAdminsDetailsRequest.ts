import { object, TypeOf } from 'zod'
import { admin } from '../../../db'

export const getAdminsDetailsRequest = object({
  admin_id: admin.shape.id
})

export type GetAdminsDetailsRequest = TypeOf<typeof getAdminsDetailsRequest>
