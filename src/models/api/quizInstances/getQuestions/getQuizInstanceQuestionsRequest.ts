import { object, TypeOf } from 'zod'
import { quizInstance } from '../../../db'

export const getQuizInstanceQuestionsRequest = object({
  quiz_instance_id: quizInstance.shape.id
})

export type GetQuizInstanceQuestionsRequest = TypeOf<
  typeof getQuizInstanceQuestionsRequest
>
