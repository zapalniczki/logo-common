import { number, string, TypeOf } from 'zod'
import { cohort } from './cohort'
import { tableBase } from './tableBase'

export const group = tableBase.extend({
  cohort_id: cohort.shape.id,
  level: number(),
  letter: string()
})

export type Group = TypeOf<typeof group>
