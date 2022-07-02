import { object, TypeOf } from 'zod'
import { school } from '../../../db'

export const schoolDeleteRequest = object({
  school_id: school.shape.id
})

export type SchoolDeleteRequest = TypeOf<typeof schoolDeleteRequest>
