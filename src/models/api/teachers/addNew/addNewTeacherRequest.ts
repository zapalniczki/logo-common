import { TypeOf } from 'zod'
import { teacher } from '../../../db'

export const addNewTeacherRequest = teacher.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true
})

export type AddNewTeacherRequest = TypeOf<typeof addNewTeacherRequest>
