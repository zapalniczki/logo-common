import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { student } from '../../../db'

const schema = getUserSchema(object({ student_id: student.shape.id }))

export const getStudentDetailsRequest = getUserSchema(schema)

export type GetStudentDetailsRequest = TypeOf<typeof getStudentDetailsRequest>
