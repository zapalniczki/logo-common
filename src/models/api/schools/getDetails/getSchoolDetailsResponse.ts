import { boolean, enum as zenum, TypeOf } from 'zod'
import { getPermissionsSchema } from '../../../../helpers'
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

export const getSchoolDetailsResponse = getPermissionsSchema(
  getSchoolDetailsResponseSchema.omit({
    has_cohorts: true,
    has_teachers: true
  }),
  getSchoolDetailsResponsePermission
)

export type GetSchoolDetailsResponse = TypeOf<typeof getSchoolDetailsResponse>
