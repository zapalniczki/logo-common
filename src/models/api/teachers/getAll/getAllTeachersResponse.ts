import { enum as zenum, TypeOf } from 'zod'
import { getListResponseBody, getPermissionsSchema } from '../../../../helpers'
import { teacher } from '../../../db'

const getAllTeacherResponsePermission = zenum(['ADD'])

export type GetAllTeacherResponsePermission = TypeOf<
  typeof getAllTeacherResponsePermission
>

export const getAllTeachersResponseSchema = teacher.pick({
  name: true,
  surname: true,
  id: true,
  blocked: true,
  email_confirmed: true
})

export const getAllTeachersResponse = getPermissionsSchema(
  getListResponseBody(getAllTeachersResponseSchema),
  getAllTeacherResponsePermission
)

export type GetAllTeachersResponse = TypeOf<typeof getAllTeachersResponse>
