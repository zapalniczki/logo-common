import { number, object, TypeOf, enum as zenum, array } from 'zod'
import { getListResponseBody } from '../../../../helpers'
import { quizInstance } from '../../../db'

const getAllQuizInstancesResponsePermission = zenum(['ADD'])

export type GetAllQuizInstancesResponsePermission = TypeOf<
  typeof getAllQuizInstancesResponsePermission
>

export const getAllQuizInstancesResponseSchema = object({
  id: quizInstance.shape.id,
  name: quizInstance.shape.name,
  index: quizInstance.shape.index,
  created_at: quizInstance.shape.created_at,
  use_count: number()
})

export const getAllQuizInstancesResponse = getListResponseBody(
  getAllQuizInstancesResponseSchema
).extend({ permissions: array(getAllQuizInstancesResponsePermission) })

export type GetAllQuizInstancesResponse = TypeOf<
  typeof getAllQuizInstancesResponse
>
