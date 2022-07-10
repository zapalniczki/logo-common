import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { school } from '../../../db'

export const getSchoolDetailsRequest = getUserSchema(
  object({ school_id: school.shape.id })
)

export type GetSchoolDetailsRequest = TypeOf<typeof getSchoolDetailsRequest>
