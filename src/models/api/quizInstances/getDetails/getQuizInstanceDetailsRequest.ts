import { object, TypeOf } from 'zod'
import { quizInstance } from '../../../db'

export const getQuizInstanceDetailsRequest = object({
  quiz_instance_id: quizInstance.shape.id
})

export type GetQuizInstanceDetailsRequest = TypeOf<
  typeof getQuizInstanceDetailsRequest
>
