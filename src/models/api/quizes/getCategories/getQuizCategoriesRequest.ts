import { number, object, TypeOf } from 'zod'
import { teacher } from '../../../db'

const schema = object({
  teacher_id: teacher.shape.id
})

const filtersSchema = object({
  level: number().optional()
})

export const getQuizCategoriesRequest = schema.merge(filtersSchema)

export type GetQuizCategoriesRequest = TypeOf<typeof getQuizCategoriesRequest>
