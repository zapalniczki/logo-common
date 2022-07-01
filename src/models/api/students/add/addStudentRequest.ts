import { TypeOf } from 'zod'
import { student } from '../../../db'

export const addStudentRequest = student.pick({
  name: true,
  surname: true,
  email: true,
  group_id: true,
  school_id: true
})

export type AddStudentRequest = TypeOf<typeof addStudentRequest>
