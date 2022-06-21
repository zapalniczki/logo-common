import { array, date, number, object, TypeOf } from 'zod'
import { quizAttempt, student } from '../../../models'

export const getQuizAssignmentProgressResponseSchema = object({
  id: student.shape.id,
  name: student.shape.name,
  surname: student.shape.surname,
  score_percentage: number().nonnegative(),
  completed_at: quizAttempt.shape.completed_at
})
export type AttemptsResponse = TypeOf<
  typeof getQuizAssignmentProgressResponseSchema
>

const getQuizAssignmentProgressResponseItem =
  getQuizAssignmentProgressResponseSchema
    .pick({
      id: true,
      name: true,
      surname: true
    })
    .extend({
      attempts: array(
        getQuizAssignmentProgressResponseSchema
          .pick({ score_percentage: true })
          .extend({ completed_at: date() })
      )
    })

export type GetQuizAssignmentProgressResponseItem = TypeOf<
  typeof getQuizAssignmentProgressResponseItem
>

export const getQuizAssignmentProgressResponse = array(
  getQuizAssignmentProgressResponseItem
)
export type GetQuizAssignmentProgressResponse = TypeOf<
  typeof getQuizAssignmentProgressResponse
>
