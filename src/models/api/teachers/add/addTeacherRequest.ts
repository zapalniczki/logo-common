import { TypeOf } from 'zod'
import { teacher } from '../../../db'

export const addTeacherRequest = teacher.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true,
  blocked: true
})

export type AddTeacherRequest = TypeOf<typeof addTeacherRequest>
