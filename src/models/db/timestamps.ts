import { date, object, TypeOf } from 'zod'

export const timestamps = object({
  created_at: date(),
  updated_at: date()
})

export type TimeStamps = TypeOf<typeof timestamps>
