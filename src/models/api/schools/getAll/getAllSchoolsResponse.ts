import { enum as zenum, TypeOf } from 'zod'
import { getListResponseBody, getPermissionsSchema } from '../../../../helpers'
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

export const getAllSchoolsResponse = getPermissionsSchema(
  getListResponseBody(getAllSchoolsResponseSchema),
  getAllSchoolResponsePermission
)

export type GetAllSchoolsResponse = TypeOf<typeof getAllSchoolsResponse>
