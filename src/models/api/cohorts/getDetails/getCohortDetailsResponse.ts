import { array, enum as zenum, number, TypeOf } from 'zod'
import { cohort } from '../../../db'

const getCohortDetailsResponsePermission = zenum([
  'EDIT',
  'DELETE',
  'MAKE_CURRENT'
])

export type GetCohortDetailsResponsePermission = TypeOf<
  typeof getCohortDetailsResponsePermission
>

export const getCohortDetailsResponseSchema = cohort
  .pick({
    year: true,
    is_current: true,
    id: true
  })
  .extend({ group_count: number() })

export const getCohortDetailsResponse = getCohortDetailsResponseSchema.extend({
  permissions: array(getCohortDetailsResponsePermission)
})

export type GetCohortDetailsResponse = TypeOf<typeof getCohortDetailsResponse>
