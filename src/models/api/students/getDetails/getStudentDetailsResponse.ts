import { boolean, enum as zenum, TypeOf } from 'zod'
import { getPermissionsSchema } from '../../../../helpers'
import { student } from '../../../db'

const getStudentDetailsResponsePermission = zenum([
  'DELETE',
  'BLOCK',
  'UNBLOCK',
  'EDIT',
  'SEND_ACTIVATION'
])

export type GetStudentDetailsResponsePermission = TypeOf<
  typeof getStudentDetailsResponsePermission
>

export const getStudentDetailsResponseSchema = student
  .pick({
    name: true,
    email: true,
    id: true,
    surname: true,
    blocked: true,
    email_confirmed: true
    // created_at: true
  })
  .extend({ has_quiz_attempts: boolean() })

export type GetStudentDetailsResponseSchema = TypeOf<
  typeof getStudentDetailsResponseSchema
>

export const getStudentDetailsResponse = getPermissionsSchema(
  getStudentDetailsResponseSchema.omit({ has_quiz_attempts: true }),
  getStudentDetailsResponsePermission
)

export type GetStudentDetailsResponse = TypeOf<typeof getStudentDetailsResponse>
