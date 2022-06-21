import { number, object, TypeOf } from 'zod'
import { teacher } from '../../../db'

export const getStatisticsProgressRequest = object({
  teacher_id: teacher.shape.id,
  limit: number().optional()
})

export type GetStatisticsProgressRequest = TypeOf<
  typeof getStatisticsProgressRequest
>
