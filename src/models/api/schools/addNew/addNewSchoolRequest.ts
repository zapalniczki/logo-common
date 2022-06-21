import { TypeOf } from 'zod'
import { school } from '../../../db'

export const addNewSchoolRequest = school.omit({
  created_at: true,
  updated_at: true,
  id: true,
  email_confirmed: true,
  admin_id: true
})

export type AddNewSchoolRequest = TypeOf<typeof addNewSchoolRequest>
