import { array, boolean, date, number, object, TypeOf } from 'zod'
import {
  question,
  quizAssignment,
  answerAttempt,
  questionInstance,
  quizAttempt,
  answerInstance,
  answer
} from '../../../db'

const alfaSchema = object({
  index: question.shape.index,
  no_attempts: boolean(),
  attempt_count: number(),
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts,
  score: answerAttempt.shape.score,
  content: questionInstance.shape.content,
  id: questionInstance.shape.id,
  points: question.shape.points
})

const betaSchema = object({
  started_at: quizAttempt.shape.started_at,
  completed_at: quizAttempt.shape.completed_at,
  pass_threshold: quizAssignment.shape.pass_threshold,
  is_completed: quizAttempt.shape.is_completed,
  display_name: quizAttempt.shape.display_name,
  index: quizAttempt.shape.index
})

const cetaSchema = object({
  answer_instance_id: answerInstance.shape.id,
  answer_attempt_id: answerAttempt.shape.id.nullable(),
  explanation: answerInstance.shape.explanation,
  question_instance_id: questionInstance.shape.id,
  is_correct: answer.shape.is_correct,
  score: answerAttempt.shape.score.nullable(),
  created_at: date().nullable(),
  id: answerInstance.shape.id,
  value: answerInstance.shape.value
})

const deltaSchema = cetaSchema.extend({
  is_correct: cetaSchema.shape.is_correct.nullable()
})

const echoSchema = alfaSchema.extend({
  answers: array(deltaSchema)
})

export const getQuizAttemptReviewResponse = betaSchema.extend({
  questions: array(echoSchema)
})

export type GetQuizAttemptReviewResponse = TypeOf<
  typeof getQuizAttemptReviewResponse
>
