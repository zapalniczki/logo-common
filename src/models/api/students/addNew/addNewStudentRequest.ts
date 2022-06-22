import { TypeOf } from 'zod'
import { student } from '../../../db'

export const addNewStudentRequest = student.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true
})

export type AddNewStudentRequest = TypeOf<typeof addNewStudentRequest>
