import { date, object, TypeOf } from 'zod'
import {
  answerAttempt,
  question,
  quiz,
  quizAssignment,
  quizAttempt,
  quizAttemptResult,
  student
} from '../../../models'
import { getListResponseBody } from '../../../utils'

export const getStatisticsSubmissionsResponseAttemptsWithScore = object({
  score: answerAttempt.shape.score,
  id: quizAttempt.shape.id,
  completed_at: date(),
  pass_threshold: quizAssignment.shape.pass_threshold,
  quiz_name: quiz.shape.name,
  quiz_category: quiz.shape.category,
  points: question.shape.points,
  student_name: student.shape.name,
  student_surname: student.shape.surname
})

export type GetStatisticsSubmissionsResponseAttemptsWithScore = TypeOf<
  typeof getStatisticsSubmissionsResponseAttemptsWithScore
>

export const getStatisticsSubmissionsResponseSchema =
  getStatisticsSubmissionsResponseAttemptsWithScore.extend({
    result: quizAttemptResult
  })

export const getStatisticsSubmissionsResponse = getListResponseBody(
  getStatisticsSubmissionsResponseSchema
)

export type GetStatisticsSubmissionsResponse = TypeOf<
  typeof getStatisticsSubmissionsResponse
>
