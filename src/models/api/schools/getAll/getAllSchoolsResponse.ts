import { TypeOf, enum as zenum, array } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { school } from '../../../db'

const getAllSchoolResponsePermission = zenum(['ADD'])

export type GetAllSchoolResponsePermission = TypeOf<
  typeof getAllSchoolResponsePermission
>

export const getAllSchoolsResponseSchema = school.pick({
  name: true,
  email: true,
  id: true,
  blocked: true,
  email_confirmed: true
})

export const getAllSchoolsResponse = getListResponseBody(
  getAllSchoolsResponseSchema
).extend({ permissions: array(getAllSchoolResponsePermission) })

export type GetAllSchoolsResponse = TypeOf<typeof getAllSchoolsResponse>
