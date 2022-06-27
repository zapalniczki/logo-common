import { object, TypeOf } from 'zod'
import { cohort } from '../../../db'

export const deleteCohortRequest = object({
  cohort_id: cohort.shape.id
})

export type DeleteCohortRequest = TypeOf<typeof deleteCohortRequest>
