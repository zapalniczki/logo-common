import { number, object, TypeOf } from 'zod'
import { getListResponseBody } from 'helpers'
import { cohort } from '../../../db'

const schema = object({
  id: cohort.shape.id,
  year: cohort.shape.year,
  is_current: cohort.shape.is_current,
  group_count: number()
})

export const getAllCohortsResponse = getListResponseBody(schema)

export type GetAllCohortsResponse = TypeOf<typeof getAllCohortsResponse>
