import {
  number,
  object,
  TypeOf,
  enum as zenum,
  boolean,
  undefined,
  string,
  array
} from 'zod'
import { admin, school, student, teacher } from './db'

export const paginator = object({
  limit: number().optional(),
  page: number().optional()
})

export type Paginator = TypeOf<typeof paginator>

export const sortingOrder = zenum(['ASC', 'DESC']).optional()

export type SortingOrder = TypeOf<typeof sortingOrder>

export const pagination = object({
  limit: number(),
  has_next_page: boolean(),
  page: number()
})

export type Pagination = TypeOf<typeof pagination>

export const quizAttemptResult = zenum(['PASS', 'NEUTRAL', 'FAIL'])
export type QuizAttemptResult = TypeOf<typeof quizAttemptResult>

export const userRole = zenum(['TEACHER', 'STUDENT', 'SCHOOL', 'ADMIN'])
export type UserRole = TypeOf<typeof userRole>

export const userParams = object({
  admin_id: admin.shape.id,
  school_id: undefined(),
  teacher_id: undefined(),
  student_id: undefined()
})
  .or(
    object({
      admin_id: undefined(),
      school_id: school.shape.id,
      teacher_id: undefined(),
      student_id: undefined()
    })
  )
  .or(
    object({
      admin_id: undefined(),
      school_id: undefined(),
      teacher_id: teacher.shape.id,
      student_id: undefined()
    })
  )
  .or(
    object({
      admin_id: undefined(),
      school_id: undefined(),
      teacher_id: undefined(),
      student_id: student.shape.id
    })
  )
export type UserParams = TypeOf<typeof userParams>

export const userSchema = object({
  user_id: admin.shape.id
    .or(school.shape.id)
    .or(teacher.shape.id)
    .or(student.shape.id)
})
export type UserSchema = TypeOf<typeof userSchema>

export const filterValue = object({
  value: string(),
  inOn: boolean()
})
export type FilterValue = TypeOf<typeof filterValue>

export const filter = object({
  key: string(),
  options: array(filterValue)
})
export type Filter = TypeOf<typeof filter>

export * from './db'
export * from './dbEnums'
export * from './api'
