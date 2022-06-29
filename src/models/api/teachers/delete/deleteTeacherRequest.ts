import { object, TypeOf } from 'zod'
import { cohort, teacher } from '../../../db'

export const teacherDeleteRequest = object({
  teacher_id: teacher.shape.id
})

export type TeacherDeleteRequest = TypeOf<typeof teacherDeleteRequest>
