import { object, TypeOf } from 'zod'
import { student } from '../../../db'

export const deleteStudentRequest = object({
  student_id: student.shape.id
})

export type DeleteStudentRequest = TypeOf<typeof deleteStudentRequest>
