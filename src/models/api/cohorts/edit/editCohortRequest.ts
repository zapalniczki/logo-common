import { object, TypeOf } from 'zod'
import { cohort } from '../../../db'

export const editCohortRequest = object({
  year: cohort.shape.year
})
  .partial()
  .merge(cohort.pick({ id: true }))

export type EditCohortRequest = TypeOf<typeof editCohortRequest>
