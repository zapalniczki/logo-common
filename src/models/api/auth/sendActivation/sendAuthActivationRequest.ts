import { object, TypeOf } from 'zod'
import { admin, school, student, teacher } from '../../../db'

export const sendAuthActivationRequest = object({
  email: teacher.shape.email.or(student.shape.email).or(school.shape.email)
})

export type SendAuthActivationRequest = TypeOf<typeof sendAuthActivationRequest>
