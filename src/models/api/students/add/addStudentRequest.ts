import { TypeOf } from 'zod'
import { student } from '../../../db'

export const addStudentRequest = student.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true
})

export type AddStudentRequest = TypeOf<typeof addStudentRequest>
