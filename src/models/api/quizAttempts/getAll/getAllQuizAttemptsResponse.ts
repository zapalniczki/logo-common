import { enum as zenum, number, object, TypeOf } from 'zod'
import { quizAttemptResult } from '../../..'
import { getListResponseBody, getPermissionsSchema } from 'helpers'
import { answerAttempt, question, quizAttempt } from '../../../db'

const schema = object({
  display_name: quizAttempt.shape.display_name,
  id: quizAttempt.shape.id,
  index: quizAttempt.shape.index,
  status: zenum(['COMPLETED', 'STARTED', 'NEW']),

  created_at: quizAttempt.shape.created_at,

  is_started: quizAttempt.shape.is_started,
  question_count: number(),
  questions_left: number(),
  started_at: quizAttempt.shape.started_at,

  completed_at: quizAttempt.shape.completed_at,
  is_completed: quizAttempt.shape.is_completed,
  percentage_score: number(),
  points: question.shape.points,
  result: quizAttemptResult,
  score: answerAttempt.shape.score
})

const permission = zenum(['ADD_NEW'])
const permissions = getPermissionsSchema(permission)

const listAndPagination = getListResponseBody(schema)

export const getAllQuizAttemptsResponse = listAndPagination.merge(permissions)

export type GetAllQuizAttemptsResponse = TypeOf<
  typeof getAllQuizAttemptsResponse
>
