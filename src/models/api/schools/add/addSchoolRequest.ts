import { TypeOf } from 'zod'
import { school } from '../../../db'

export const addSchoolRequest = school.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true,
  admin_id: true,
  blocked: true
})

export type AddSchoolRequest = TypeOf<typeof addSchoolRequest>
