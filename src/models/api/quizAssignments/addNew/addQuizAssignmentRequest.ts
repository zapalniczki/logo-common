import { object, string, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { quizAssignment } from '../../../db'

export const addQuizAssignmentRequestSchema = object({
  quiz_id: quizAssignment.shape.quiz_id,
  quiz_instance_id: quizAssignment.shape.id.optional(),
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts,
  pass_threshold: quizAssignment.shape.pass_threshold,
  name: quizAssignment.shape.name,
  group_id: quizAssignment.shape.group_id,
  should_randomize_quiz_instance_id:
    quizAssignment.shape.should_randomize_quiz_instance_id,
  mode: quizAssignment.shape.mode,
  allowed_quiz_attempts: quizAssignment.shape.allowed_quiz_attempts,
  attempt_time: quizAssignment.shape.attempt_time,
  due_date: string()
})

export type AddQuizAssignmentRequestSchema = TypeOf<
  typeof addQuizAssignmentRequestSchema
>

export const addQuizAssignmentRequest = getUserSchema(
  addQuizAssignmentRequestSchema
)

export type AddQuizAssignmentRequest = TypeOf<typeof addQuizAssignmentRequest>
