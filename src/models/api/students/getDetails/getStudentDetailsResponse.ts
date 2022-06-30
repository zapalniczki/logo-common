import { TypeOf } from 'zod'
import { student } from '../../../db'

export const getStudentDetailsResponse = student.pick({
  name: true,
  email: true,
  id: true,
  surname: true,
  blocked: true,
  email_confirmed: true
})

export type GetStudentDetailsResponse = TypeOf<typeof getStudentDetailsResponse>
