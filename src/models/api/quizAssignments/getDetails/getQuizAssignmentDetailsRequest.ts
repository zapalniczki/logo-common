import { object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { quizAssignment } from '../../../db'

export const getQuizAssignmentDetailsRequest = getUserSchema(
  object({ quiz_assignment_id: quizAssignment.shape.id })
)

export type GetQuizAssignmentDetailsRequest = TypeOf<
  typeof getQuizAssignmentDetailsRequest
>
