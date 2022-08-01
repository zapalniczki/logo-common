import { string, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { quizAssignment, quizInstance } from '../../../db'

export const addQuizAssignmentRequestSchema = quizAssignment
  .pick({
    quiz_id: true,
    allowed_question_attempts: true,
    pass_threshold: true,
    name: true,
    group_id: true,
    should_randomize_quiz_instance_id: true,
    allowed_quiz_attempts: true,
    attempt_time: true,
    mode: true,
    is_published: true
  })
  .extend({
    quiz_instance_id: quizInstance.shape.id.optional(),
    due_date: string()
  })

export type AddQuizAssignmentRequestSchema = TypeOf<
  typeof addQuizAssignmentRequestSchema
>

export const addQuizAssignmentRequest = getUserSchema(
  addQuizAssignmentRequestSchema
)

export type AddQuizAssignmentRequest = TypeOf<typeof addQuizAssignmentRequest>
