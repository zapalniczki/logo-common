import { TypeOf } from 'zod'
import { school } from '../../../db'

export const getSchoolDetailsResponse = school.pick({
  name: true,
  email: true,
  id: true,
  blocked: true,
  email_confirmed: true
})

export type GetSchoolDetailsResponse = TypeOf<typeof getSchoolDetailsResponse>
