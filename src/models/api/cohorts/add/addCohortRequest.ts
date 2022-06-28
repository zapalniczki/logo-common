import { object, TypeOf } from 'zod'
import { cohort, school } from '../../../db'

export const addCohortRequest = object({
  year: cohort.shape.year,
  school_id: school.shape.id
})

export type AddCohortRequest = TypeOf<typeof addCohortRequest>
