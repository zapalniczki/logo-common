import { array, boolean, enum as zenum, TypeOf } from 'zod'
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
  .extend({ has_quiz_assignments: boolean() })

export type GetStudentDetailsResponseSchema = TypeOf<
  typeof getStudentDetailsResponseSchema
>

export const getStudentDetailsResponse = getStudentDetailsResponseSchema
  .omit({ has_quiz_assignments: true })
  .extend({ permissions: array(getStudentDetailsResponsePermission) })

export type GetStudentDetailsResponse = TypeOf<typeof getStudentDetailsResponse>
