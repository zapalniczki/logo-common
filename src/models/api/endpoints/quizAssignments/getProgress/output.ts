import { array, date, number, object, TypeOf } from 'zod'
import { quizAttempt, student } from '../../../models'

export const attemptsSchema = object({
  id: student.shape.id,
  name: student.shape.name,
  surname: student.shape.surname,
  score_percentage: number().nonnegative(),
  completed_at: quizAttempt.shape.completed_at
})
export type AttemptsResponse = TypeOf<typeof attemptsSchema>

const responseBodyItem = attemptsSchema
  .pick({
    id: true,
    name: true,
    surname: true
  })
  .extend({
    attempts: array(
      attemptsSchema
        .pick({ score_percentage: true })
        .extend({ completed_at: date() })
    )
  })

export type ResponseBodyItem = TypeOf<typeof responseBodyItem>

export const responseBody = array(responseBodyItem)
export type ResponseBody = TypeOf<typeof responseBody>
