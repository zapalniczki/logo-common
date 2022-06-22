import { TypeOf } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { teacher } from '../../../db'

const schema = teacher.pick({
  name: true,
  surname: true,
  id: true
})

export const getAllTeachersResponse = getListResponseBody(schema)

export type GetAllTeachersResponse = TypeOf<typeof getAllTeachersResponse>
