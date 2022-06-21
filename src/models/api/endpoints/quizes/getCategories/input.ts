import { number, object, TypeOf } from 'zod'
import { teacher } from '../../../models'

const schema = object({
  teacher_id: teacher.shape.id
})

const filtersSchema = object({
  level: number().optional()
})

export const queryParams = schema.merge(filtersSchema)

export type QueryParams = TypeOf<typeof queryParams>
