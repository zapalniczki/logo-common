import { TypeOf } from 'zod'
import { student } from '../../../db'

export const addNewStudentResponse = student.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true
})

export type AddNewStudentResponse = TypeOf<typeof addNewStudentResponse>
