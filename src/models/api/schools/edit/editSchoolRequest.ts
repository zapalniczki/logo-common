import { TypeOf } from 'zod'
import { school } from '../../../db'

export const editSchoolRequest = school
  .pick({
    name: true,
    email: true,
    blocked: true
  })
  .partial()
  .merge(school.pick({ id: true }))

export type EditSchoolRequest = TypeOf<typeof editSchoolRequest>
