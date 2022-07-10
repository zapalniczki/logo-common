import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { cohort } from '../../../db'

export const getCohortDetailsRequest = getUserSchema(
  object({ cohort_id: cohort.shape.id })
)

export type GetCohortDetailsRequest = TypeOf<typeof getCohortDetailsRequest>
