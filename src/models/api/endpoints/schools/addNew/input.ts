import { TypeOf } from 'zod'
import { school } from '../../../models'

export const requestBody = school.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true,
  admin_id: true
})

export type RequestBody = TypeOf<typeof requestBody>
