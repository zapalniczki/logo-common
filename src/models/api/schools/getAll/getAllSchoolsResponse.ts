import { TypeOf } from 'zod'
import { school } from '../../../db'

export const getAllSchoolsResponse = school.pick({
  name: true,
  email: true,
  id: true,
  email_confirmed: true
})

export type GetAllSchoolsResponse = TypeOf<typeof getAllSchoolsResponse>
