import { enum as zenum, string, TypeOf } from 'zod'
import { getPermissionsSchema } from '../../../../helpers'
import { quiz, quizAssignment, quizInstance } from '../../../db'

const getQuizAssignmentDetailsResponsePermission = zenum([
  'DELETE',
  'EDIT',
  'PUBLISH',
  'UNPUBLISH',
  'VIEW_PROGRESS',
  'VIEW_ATTEMPTS'
])

export type GetQuizAssignmentDetailsResponsePermission = TypeOf<
  typeof getQuizAssignmentDetailsResponsePermission
>

export const getQuizAssignmentDetailsResponseSchema = quizAssignment
  .pick({
    id: true,
    name: true,
    created_at: true,
    mode: true,
    pass_threshold: true,
    allowed_question_attempts: true,
    allowed_quiz_attempts: true,
    has_been_quiz_instance_id_randomly_selected: true,
    attempt_time: true,
    due_date: true,
    is_published: true
  })
  .merge(quiz.pick({ category: true }))
  .extend({
    group_name: string(),
    teacher_name: string(),
    quiz_name: quiz.shape.name,
    quiz_instance_name: quizInstance.shape.name.nullable()
  })

export type GetQuizAssignmentDetailsResponseSchema = TypeOf<
  typeof getQuizAssignmentDetailsResponseSchema
>

export const getQuizAssignmentDetailsResponse = getPermissionsSchema(
  getQuizAssignmentDetailsResponseSchema,
  getQuizAssignmentDetailsResponsePermission
)

export type GetQuizAssignmentDetailsResponse = TypeOf<
  typeof getQuizAssignmentDetailsResponse
>
