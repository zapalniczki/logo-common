import { object, TypeOf } from 'zod'
import { cohort, teacher } from '../../../db'

export const teacherCohortRequest = object({
  teacher_id: teacher.shape.id
})

export type TeacherCohortRequest = TypeOf<typeof teacherCohortRequest>
