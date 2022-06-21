import { TypeOf } from 'zod'
import { teacher } from '../../../models'
import { getListResponseBody } from '../../../utils'

const schema = teacher.pick({
  name: true,
  surname: true,
  id: true
})

export const responseBody = getListResponseBody(schema)

export type ResponseBody = TypeOf<typeof responseBody>
