import { enum as zenum, number, object, TypeOf } from 'zod'
import { quizAttemptResult } from '../../..'
import { getListResponseBody, getPermissionsSchema } from '../../../../helpers'
import { answerAttempt, question, quizAttempt } from '../../../db'

const getAllQuizAttemptsResponsePermission = zenum(['ADD_NEW'])
export type GetAllQuizAttemptsResponsePermission = TypeOf<
  typeof getAllQuizAttemptsResponsePermission
>

const getAllQuizAttemptsResponseSchema = object({
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
export type GetAllQuizAttemptsResponseSchema = TypeOf<
  typeof getAllQuizAttemptsResponseSchema
>

export const getAllQuizAttemptsResponse = getPermissionsSchema(
  getListResponseBody(getAllQuizAttemptsResponseSchema),
  getAllQuizAttemptsResponsePermission
)

export type GetAllQuizAttemptsResponse = TypeOf<
  typeof getAllQuizAttemptsResponse
>
