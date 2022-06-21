import { TypeOf } from 'zod'
import { teacher } from '../../../models'

export const requestBody = teacher.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true
})

export type RequestBody = TypeOf<typeof requestBody>
