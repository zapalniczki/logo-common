import { object, string, TypeOf } from 'zod'
import { cohort, student } from '../../../models'
import { getListResponseBody } from '../../../utils'

const schema = object({
  name: student.shape.name,
  surname: student.shape.surname,
  email: student.shape.email,
  id: student.shape.id,
  email_confirmed: student.shape.email_confirmed,
  cohort: cohort.shape.year,
  group: string()
})

export const responseBody = getListResponseBody(schema)

export type ResponseBody = TypeOf<typeof responseBody>
