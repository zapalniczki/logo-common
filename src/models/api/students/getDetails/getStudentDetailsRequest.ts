import { object, TypeOf } from 'zod'
import { student } from '../../../db'

export const getStudentDetailsRequest = object({
  student_id: student.shape.id
})

export type GetStudentDetailsRequest = TypeOf<typeof getStudentDetailsRequest>
