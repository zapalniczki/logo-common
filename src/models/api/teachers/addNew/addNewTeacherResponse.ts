import { TypeOf } from 'zod'
import { teacher } from '../../../db'

export const addNewTeacherResponse = teacher.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true
})

export type AddNewTeacherResponse = TypeOf<typeof addNewTeacherResponse>
