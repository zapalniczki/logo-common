import { object, TypeOf } from 'zod'
import { teacher } from '../../../db'

export const getTeacherDetailsRequest = object({
  teacher_id: teacher.shape.id
})

export type GetTeacherDetailsRequest = TypeOf<typeof getTeacherDetailsRequest>
