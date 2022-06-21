import { array, boolean, number, object, string, TypeOf } from 'zod'
import { question, quizAssignment, quizAttempt } from '../../../models'

export const responseBodyDetails = object({
  attempt_time: quizAssignment.shape.attempt_time,
  started_at: quizAttempt.shape.started_at,
  is_started: quizAttempt.shape.is_started
})

export const responseBodyQuestion = object({
  index: question.shape.index,
  id: string(),
  no_attempts: boolean(),
  attempt_count: number(),
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts
})

export const responseBody = responseBodyDetails.extend({
  list: array(responseBodyQuestion)
})

export type ResponseBody = TypeOf<typeof responseBody>
