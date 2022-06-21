import { object, string, TypeOf } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { student, cohort } from '../../../db'

const schema = object({
  name: student.shape.name,
  surname: student.shape.surname,
  email: student.shape.email,
  id: student.shape.id,
  email_confirmed: student.shape.email_confirmed,
  cohort: cohort.shape.year,
  group: string()
})

export const getAllStudentsResponse = getListResponseBody(schema)

export type GetAllStudentsResponse = TypeOf<typeof getAllStudentsResponse>
