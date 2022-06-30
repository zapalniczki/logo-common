import { TypeOf, enum as zenum, array } from 'zod'
import { getListResponseBody } from '../../../../helpers'
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

export const getAllTeachersResponse = getListResponseBody(
  getAllTeachersResponseSchema
).extend({
  permissions: array(getAllTeacherResponsePermission)
})

export type GetAllTeachersResponse = TypeOf<typeof getAllTeachersResponse>
