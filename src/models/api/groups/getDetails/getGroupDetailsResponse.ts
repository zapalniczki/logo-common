import { enum as zenum, number, TypeOf } from 'zod'
import { getPermissionsSchema } from '../../../../helpers'
import { cohort, group } from '../../../db'

const getGroupDetailsResponsePermission = zenum([
  'ADD_STUDENT',
  'EDIT',
  'DELETE'
])

export type GetGroupDetailsResponsePermission = TypeOf<
  typeof getGroupDetailsResponsePermission
>

export const getGroupDetailsResponseSchema = group
  .pick({
    level: true,
    letter: true,
    created_at: true,
    id: true,
    cohort_id: true
  })
  .extend({
    cohort_year: cohort.shape.year,
    student_count: number()
  })

export type GetGroupDetailsResponseSchema = TypeOf<
  typeof getGroupDetailsResponseSchema
>

export const getGroupDetailsResponse = getPermissionsSchema(
  getGroupDetailsResponseSchema.omit({ student_count: true }),
  getGroupDetailsResponsePermission
)

export type GetGroupDetailsResponse = TypeOf<typeof getGroupDetailsResponse>
