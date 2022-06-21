import { TypeOf } from 'zod'
import { school } from '../../../db'

export const getSchoolDetailsResponse = school.pick({
  name: true,
  email: true,
  id: true
})

export type GetSchoolDetailsResponse = TypeOf<typeof getSchoolDetailsResponse>
