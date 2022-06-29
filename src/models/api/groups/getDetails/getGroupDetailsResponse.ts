import { array, enum as zenum, number, TypeOf } from 'zod'
import { cohort, group } from '../../../db'

const getGroupDetailsResponsePermission = zenum(['EDIT', 'DELETE'])

export type GetGroupDetailsResponsePermission = TypeOf<
  typeof getGroupDetailsResponsePermission
>

export const getGroupDetailsResponseSchema = group
  .pick({
    level: true,
    letter: true,
    // created_at: true,
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

export const getGroupDetailsResponse = getGroupDetailsResponseSchema
  .omit({ student_count: true })
  .extend({ permissions: array(getGroupDetailsResponsePermission) })

export type GetGroupDetailsResponse = TypeOf<typeof getGroupDetailsResponse>