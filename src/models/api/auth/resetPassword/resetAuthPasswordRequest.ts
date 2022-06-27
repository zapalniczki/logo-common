import { object, TypeOf } from 'zod'
import { school, student, teacher } from '../../../db'

export const resetAuthPasswordRequest = object({
  email: teacher.shape.email.or(student.shape.email).or(school.shape.email)
})

export type ResetAuthPasswordRequest = TypeOf<typeof resetAuthPasswordRequest>
