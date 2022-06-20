import { boolean, number, TypeOf } from 'zod'
import { school } from './school'
import { tableBase } from './tableBase'

export const cohort = tableBase.extend({
  school_id: school.shape.id,
  year: number(),
  is_current: boolean()
})

export type Cohort = TypeOf<typeof cohort>
