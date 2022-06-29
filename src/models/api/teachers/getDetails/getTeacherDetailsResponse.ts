import { array, boolean, enum as zenum, TypeOf } from 'zod'
import { teacher } from '../../../db'

const getTeacherDetailsResponsePermission = zenum([
  'DELETE',
  'BLOCK',
  'UNBLOCK',
  'EDIT',
  'SEND_ACTIVATION'
])

export type GetTeacherDetailsResponsePermission = TypeOf<
  typeof getTeacherDetailsResponsePermission
>

export const getTeacherDetailsResponseSchema = teacher
  .pick({
    name: true,
    email: true,
    id: true,
    surname: true,
    email_confirmed: true,
    blocked: true
    // created_at: true
  })
  .extend({ has_quiz_assignments: boolean() })

export const getTeacherDetailsResponse = getTeacherDetailsResponseSchema
  .omit({ has_quiz_assignments: true })
  .extend({ permissions: array(getTeacherDetailsResponsePermission) })

export type GetTeacherDetailsResponse = TypeOf<typeof getTeacherDetailsResponse>
