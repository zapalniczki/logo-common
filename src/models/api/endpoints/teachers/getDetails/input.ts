import { object, TypeOf } from 'zod'
import { teacher } from '../../../models'

export const queryParams = object({
  teacher_id: teacher.shape.id
})

export type QueryParams = TypeOf<typeof queryParams>
