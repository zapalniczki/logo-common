import { object, TypeOf } from 'zod'
import { admin } from '../../../db'

export const getAllSchoolsRequest = object({
  admin_id: admin.shape.id
})

export type GetAllSchoolsRequest = TypeOf<typeof getAllSchoolsRequest>
