import { TypeOf, enum as zenum, array } from 'zod'
import { teacher } from '../../../db'

const getTeacherDetailsResponsePermissions = zenum([
  'DELETE',
  'BLOCK',
  'UNBLOCK',
  'EDIT',
  'SEND_ACTIVATION'
])

export type GetTeacherDetailsResponsePermissions = TypeOf<
  typeof getTeacherDetailsResponsePermissions
>

export const getTeacherDetailsResponseSchema = teacher.pick({
  name: true,
  email: true,
  id: true,
  surname: true,
  email_confirmed: true,
  blocked: true
})

export const getTeacherDetailsResponse = getTeacherDetailsResponseSchema.extend(
  {
    permissions: array(getTeacherDetailsResponsePermissions)
  }
)

export type GetTeacherDetailsResponse = TypeOf<typeof getTeacherDetailsResponse>
