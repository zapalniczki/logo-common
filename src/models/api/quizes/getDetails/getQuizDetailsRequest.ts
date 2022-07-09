import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { quiz } from '../../../db'

const schema = object({
  quiz_id: quiz.shape.id
})

export const getQuizDetailsRequest = getUserSchema(schema)

export type GetQuizDetailsRequest = TypeOf<typeof getQuizDetailsRequest>
