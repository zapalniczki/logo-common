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

export const quizAttemptsWithScore = object({
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

export type QuizAttemptsWithScore = TypeOf<typeof quizAttemptsWithScore>

export const schema = quizAttemptsWithScore.extend({
  result: quizAttemptResult
})

export const responseBody = getListResponseBody(schema)

export type ResponseBody = TypeOf<typeof responseBody>
