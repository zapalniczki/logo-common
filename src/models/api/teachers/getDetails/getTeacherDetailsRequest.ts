import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { teacher } from '../../../db'

export const getTeacherDetailsRequest = getUserSchema(
  object({ teacher_id: teacher.shape.id })
)

export type GetTeacherDetailsRequest = TypeOf<typeof getTeacherDetailsRequest>
