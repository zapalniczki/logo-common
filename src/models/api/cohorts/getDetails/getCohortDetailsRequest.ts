import { object, TypeOf } from 'zod'
import { cohort } from '../../../db'

export const getCohortDetailsRequest = object({
  cohort_id: cohort.shape.id
})

export type GetCohortDetailsRequest = TypeOf<typeof getCohortDetailsRequest>
