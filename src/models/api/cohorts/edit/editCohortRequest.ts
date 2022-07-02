import { TypeOf } from 'zod'
import { cohort } from '../../../db'

export const editCohortRequest = cohort
  .pick({ year: true })
  .partial()
  .merge(cohort.pick({ id: true }))

export type EditCohortRequest = TypeOf<typeof editCohortRequest>
