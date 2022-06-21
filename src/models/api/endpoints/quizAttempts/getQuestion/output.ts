import { boolean, number, object, TypeOf } from 'zod'
import {
  answer,
  answerAttempt,
  question,
  questionInstance,
  quizAssignment,
  quizAttempt
} from '../../../models'

export const responseBody = object({
  is_quiz_attempt_completed: quizAttempt.shape.is_completed,
  content: questionInstance.shape.content,
  points: question.shape.points,
  started_at: quizAttempt.shape.started_at,
  attempt_time: quizAssignment.shape.attempt_time,
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts,
  is_last: boolean(),
  score: question.shape.points,
  attempt_count: number(),
  next_attempt_allowed: boolean(),
  last_attempt_answer_instance_id: answerAttempt.shape.id.nullable(),
  last_attempt_is_correct: answer.shape.is_correct.nullable()
})

export type ResponseBody = TypeOf<typeof responseBody>
