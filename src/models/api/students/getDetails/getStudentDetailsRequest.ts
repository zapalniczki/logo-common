import { object, TypeOf, undefined, intersection, union } from 'zod'
import { school, student, teacher } from '../../../db'

export const schema = object({
  student_id: student.shape.id
})

const teacherSchema = object({
  teacher_id: teacher.shape.id,
  school_id: undefined()
}).merge(schema)

const schoolSchema = object({
  teacher_id: undefined(),
  school_id: school.shape.id
}).merge(schema)

export const getStudentDetailsRequest = union([teacherSchema, schoolSchema])

export type GetStudentDetailsRequest = TypeOf<typeof getStudentDetailsRequest>
