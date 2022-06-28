import { object, TypeOf } from 'zod'
import { cohort } from '../../../db'

export const makeCohortCurrentRequest = object({
  cohort_id: cohort.shape.id,
  school_id: cohort.shape.school_id
})

export type MakeCohortCurrentRequest = TypeOf<typeof makeCohortCurrentRequest>
