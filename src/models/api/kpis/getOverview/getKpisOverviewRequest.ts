import { object, TypeOf } from 'zod'
import { admin, school, student, teacher } from '../../../db'

export const getKpisOverviewRequest = object({
  teacher_id: teacher.shape.id.optional(),
  student_id: student.shape.id.optional(),
  school_id: school.shape.id.optional(),
  admin_id: admin.shape.id.optional()
})

export type GetKpisOverviewRequest = TypeOf<typeof getKpisOverviewRequest>
