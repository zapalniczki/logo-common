import { object, TypeOf, undefined, union } from 'zod'
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

const studentSchema = object({
  teacher_id: undefined(),
  school_id: school.shape.id
}).merge(schema)

export const getStudentDetailsRequest = union([
  schoolSchema,
  teacherSchema,
  studentSchema
])

export type GetStudentDetailsRequest = TypeOf<typeof getStudentDetailsRequest>
