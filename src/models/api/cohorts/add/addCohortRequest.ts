import { object, TypeOf } from 'zod'
import { cohort } from '../../../db'

export const addCohortRequest = object({
  year: cohort.shape.year,
  school_id: cohort.shape.school_id
})

export type AddCohortRequest = TypeOf<typeof addCohortRequest>
