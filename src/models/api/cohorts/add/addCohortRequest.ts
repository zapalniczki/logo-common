import { object, TypeOf } from 'zod'
import { cohort } from '../../../db'

export const addCohortRequest = object({
  year: cohort.shape.year
})

export type AddCohortRequest = TypeOf<typeof addCohortRequest>
