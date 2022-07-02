import { TypeOf } from 'zod'
import { student } from '../../../db'

export const editStudentRequest = student
  .pick({
    name: true,
    email: true,
    blocked: true,
    surname: true,
    group_id: true
  })
  .partial()
  .merge(student.pick({ id: true }))

export type EditStudentRequest = TypeOf<typeof editStudentRequest>
