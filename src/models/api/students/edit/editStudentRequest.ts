import { TypeOf } from 'zod'
import { student } from '../../../db'

export const editStudentRequest = student
  .omit({
    created_at: true,
    updated_at: true,
    school_id: true,
    email_confirmed: true,
    id: true
  })
  .partial()
  .merge(student.pick({ id: true }))

export type EditStudentRequest = TypeOf<typeof editStudentRequest>
