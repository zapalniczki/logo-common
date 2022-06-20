import { enum as zenum, TypeOf } from 'zod'

export const userRole = zenum(['TEACHER', 'STUDENT', 'SCHOOL', 'ADMIN'])

export type UserRole = TypeOf<typeof userRole>
