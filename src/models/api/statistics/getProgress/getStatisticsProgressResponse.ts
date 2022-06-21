import { array, number, object, TypeOf } from 'zod'
import { quizAttemptResult } from '../../..'
import {
  answerAttempt,
  question,
  quizAssignment,
  quizAttempt,
  student
} from '../../../db'

export const getStatisticsProgressResponseSchema = object({
  student_id: student.shape.id,
  student_name: student.shape.name,
  student_surname: student.shape.surname,
  quiz_attempt_id: quizAttempt.shape.id,
  points: question.shape.points,
  score: answerAttempt.shape.score,
  pass_threshold: quizAssignment.shape.pass_threshold,
  completed_at: quizAttempt.shape.completed_at
})

export type GetStatisticsProgressResponseSchema = TypeOf<
  typeof getStatisticsProgressResponseSchema
>

export const getStatisticsProgressResponse = object({
  id: student.shape.id,
  name: student.shape.name,
  surname: student.shape.surname,
  quiz_attempts: array(
    object({
      id: getStatisticsProgressResponseSchema.shape.quiz_attempt_id,
      points: getStatisticsProgressResponseSchema.shape.points,
      score: getStatisticsProgressResponseSchema.shape.score,
      pass_threshold: getStatisticsProgressResponseSchema.shape.pass_threshold,
      completed_at: getStatisticsProgressResponseSchema.shape.completed_at,
      percentage_score: number(),
      result: quizAttemptResult
    })
  )
})

export type GetStatisticsProgressResponse = TypeOf<
  typeof getStatisticsProgressResponse
>
