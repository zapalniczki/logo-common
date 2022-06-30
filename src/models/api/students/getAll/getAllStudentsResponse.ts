import { object, string, TypeOf } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { student, cohort } from '../../../db'

const schema = object({
  name: student.shape.name,
  surname: student.shape.surname,
  id: student.shape.id,
  email_confirmed: student.shape.email_confirmed,
  blocked: student.shape.blocked,
  cohort: cohort.shape.year,
  group: string()
})

export const getAllStudentsResponse = getListResponseBody(schema)

export type GetAllStudentsResponse = TypeOf<typeof getAllStudentsResponse>
