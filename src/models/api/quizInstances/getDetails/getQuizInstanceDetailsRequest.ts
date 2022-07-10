import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { quizInstance } from '../../../db'

const getQuizInstanceDetailsRequestSchema = object({
  quiz_instance_id: quizInstance.shape.id
})

export const getQuizInstanceDetailsRequest = getUserSchema(
  getQuizInstanceDetailsRequestSchema
)

export type GetQuizInstanceDetailsRequest = TypeOf<
  typeof getQuizInstanceDetailsRequest
>
