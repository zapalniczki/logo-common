import { TypeOf } from 'zod'
import { teacher } from '../../../db'

export const editTeacherRequest = teacher
  .pick({
    name: true,
    email: true,
    blocked: true,
    surname: true
  })
  .partial()
  .merge(teacher.pick({ id: true }))

export type EditTeacherRequest = TypeOf<typeof editTeacherRequest>
