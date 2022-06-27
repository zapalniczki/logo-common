import { array, enum as zenum, number, TypeOf } from 'zod'
import { cohort } from '../../../db'

const getCohortDetailsResponsePermissions = zenum([
  'EDIT',
  'DELETE',
  'MAKE_CURRENT'
])

export type GetCohortDetailsResponsePermissions = TypeOf<
  typeof getCohortDetailsResponsePermissions
>

export const getCohortDetailsResponseSchema = cohort
  .pick({
    year: true,
    is_current: true
  })
  .extend({
    group_count: number()
  })

export const getCohortDetailsResponse = getCohortDetailsResponseSchema.extend({
  permissions: array(getCohortDetailsResponsePermissions)
})

export type GetCohortDetailsResponse = TypeOf<typeof getCohortDetailsResponse>
