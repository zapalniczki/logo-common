import { enum as zenum, object, TypeOf } from 'zod'
import { getListResponseBody, getPermissionsSchema } from '../../../../helpers'
import { quizInstance } from '../../../db'

const getAllQuizInstancesResponsePermission = zenum(['ADD'])

export type GetAllQuizInstancesResponsePermission = TypeOf<
  typeof getAllQuizInstancesResponsePermission
>

export const getAllQuizInstancesResponseSchema = object({
  id: quizInstance.shape.id,
  name: quizInstance.shape.name,
  index: quizInstance.shape.index
})

export const getAllQuizInstancesResponse = getPermissionsSchema(
  getListResponseBody(getAllQuizInstancesResponseSchema),
  getAllQuizInstancesResponsePermission
)

export type GetAllQuizInstancesResponse = TypeOf<
  typeof getAllQuizInstancesResponse
>
