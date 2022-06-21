import { array, boolean, number, object, string, TypeOf } from 'zod'
import { quizAssignment, quizAttempt, question } from '../../../db'

export const getquizAttemptsSummaryResponseDetails = object({
  attempt_time: quizAssignment.shape.attempt_time,
  started_at: quizAttempt.shape.started_at,
  is_started: quizAttempt.shape.is_started
})

export const getquizAttemptsSummaryResponseQuestion = object({
  index: question.shape.index,
  id: string(),
  no_attempts: boolean(),
  attempt_count: number(),
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts
})

export const getquizAttemptsSummaryResponse =
  getquizAttemptsSummaryResponseDetails.extend({
    list: array(getquizAttemptsSummaryResponseQuestion)
  })

export type GetquizAttemptsSummaryResponse = TypeOf<
  typeof getquizAttemptsSummaryResponse
>
