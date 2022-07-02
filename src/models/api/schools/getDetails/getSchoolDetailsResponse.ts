import { TypeOf, enum as zenum, array, boolean } from 'zod'
import { school } from '../../../db'

const getSchoolDetailsResponsePermission = zenum([
  'DELETE',
  'BLOCK',
  'UNBLOCK',
  'EDIT',
  'SEND_ACTIVATION'
])

export type GetSchoolDetailsResponsePermission = TypeOf<
  typeof getSchoolDetailsResponsePermission
>

export const getSchoolDetailsResponseSchema = school
  .pick({
    name: true,
    email: true,
    id: true,
    blocked: true,
    email_confirmed: true
  })
  .extend({
    has_cohorts: boolean(),
    has_teachers: boolean()
  })

export type GetSchoolDetailsResponseSchema = TypeOf<
  typeof getSchoolDetailsResponseSchema
>

export const getSchoolDetailsResponse = getSchoolDetailsResponseSchema
  .omit({
    has_cohorts: true,
    has_teachers: true
  })
  .extend({ permissions: array(getSchoolDetailsResponsePermission) })

export type GetSchoolDetailsResponse = TypeOf<typeof getSchoolDetailsResponse>
