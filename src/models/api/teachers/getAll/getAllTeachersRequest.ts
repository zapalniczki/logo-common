import { TypeOf } from 'zod'
import { getListResponseBody } from 'helpers'
import { teacher } from '../../../db'

const schema = teacher.pick({
  name: true,
  surname: true,
  id: true
})

export const getAllTeachersRequest = getListResponseBody(schema)

export type GetAllTeachersRequest = TypeOf<typeof getAllTeachersRequest>
