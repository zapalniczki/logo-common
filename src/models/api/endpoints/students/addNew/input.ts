import { TypeOf } from 'zod'
import { student } from '../../../models'

export const requestBodySchema = student.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true
})

export type RequestBody = TypeOf<typeof requestBodySchema>
