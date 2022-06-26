import { TypeOf } from 'zod'
import { teacher } from '../../../db'

export const editTeacherRequest = teacher
  .omit({
    created_at: true,
    updated_at: true,
    school_id: true,
    email_confirmed: true,
    id: true
  })
  .partial()
  .merge(teacher.pick({ id: true }))

export type EditTeacherRequest = TypeOf<typeof editTeacherRequest>
