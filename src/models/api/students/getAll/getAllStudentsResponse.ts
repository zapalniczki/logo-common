import { object, string, TypeOf, enum as zenum, array } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { student, cohort } from '../../../db'

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

export const getAllStudentsResponse = getListResponseBody(
  getAllStudentsResponseSchema
).extend({
  permissions: array(getAllStudentsResponsePermission)
})

export type GetAllStudentsResponse = TypeOf<typeof getAllStudentsResponse>
