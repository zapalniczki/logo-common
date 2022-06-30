import { TypeOf } from 'zod'
import { school } from '../../../db'

export const editSchoolRequest = school
  .omit({
    created_at: true,
    updated_at: true,
    school_id: true,
    email_confirmed: true,
    admin_id: true,
    id: true
  })
  .partial()
  .merge(school.pick({ id: true }))

export type EditSchoolRequest = TypeOf<typeof editSchoolRequest>
