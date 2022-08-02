import { enum as zenum, object, string, TypeOf } from 'zod'
import { getListResponseBody, getPermissionsSchema } from '../../../../helpers'
import { cohort, student } from '../../../db'

const getAllStudentsResponsePermission = zenum(['ADD'])

export type GetAllStudentsResponsePermission = TypeOf<
  typeof getAllStudentsResponsePermission
>

export const getAllStudentsResponseSchema = object({
  name: student.shape.name,
  surname: student.shape.surname,
  id: student.shape.id,
  email_confirmed: student.shape.email_confirmed,
  blocked: student.shape.blocked,
  cohort: cohort.shape.year,
  group: string()
})

export const getAllStudentsResponse = getPermissionsSchema(
  getListResponseBody(getAllStudentsResponseSchema),
  getAllStudentsResponsePermission
)

export type GetAllStudentsResponse = TypeOf<typeof getAllStudentsResponse>
