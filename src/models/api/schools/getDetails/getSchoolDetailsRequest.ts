import { object, TypeOf } from 'zod'
import { school } from '../../../db'

export const getSchoolDetailsRequest = object({
  school_id: school.shape.id
})

export type GetSchoolDetailsRequest = TypeOf<typeof getSchoolDetailsRequest>
