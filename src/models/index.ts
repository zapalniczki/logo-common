import { number, object, TypeOf, enum as zenum, boolean } from 'zod'

export * from './db'
export * from './dbEnums'
export * from './api'

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

export const dataView = zenum(['TEACHER', 'STUDENT'])
export type DataView = TypeOf<typeof dataView>

export type Pagination = TypeOf<typeof pagination>

export const quizAttemptResult = zenum(['PASS', 'NEUTRAL', 'FAIL'])
export type QuizAttemptResult = TypeOf<typeof quizAttemptResult>
