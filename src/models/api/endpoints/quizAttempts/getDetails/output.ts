import { object, TypeOf } from 'zod'
import { quiz, quizAssignment, quizAttempt } from '../../../models'

export const responseBody = object({
  id: quizAttempt.shape.id,
  is_completed: quizAttempt.shape.is_completed,
  is_started: quizAttempt.shape.is_started,
  started_at: quizAttempt.shape.started_at,
  attempt_time: quizAssignment.shape.attempt_time,
  quiz_instance_id: quizAttempt.shape.quiz_instance_id,
  quiz_introduction: quiz.shape.introduction
})

export type ResponseBody = TypeOf<typeof responseBody>
