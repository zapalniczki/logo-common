import { TypeOf } from 'zod'
import { admin } from '../../../db'

export const getAdminsDetailsResponse = admin.pick({
  name: true,
  email: true,
  id: true,
  surname: true
})

export type GetAdminsDetailsResponse = TypeOf<typeof getAdminsDetailsResponse>
