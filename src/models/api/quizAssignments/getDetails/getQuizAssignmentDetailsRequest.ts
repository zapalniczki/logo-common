import { object, TypeOf } from 'zod'
import { quizAssignment } from '../../../models'

export const getQuizAssignmentDetailsRequest = object({
  quiz_assignment_id: quizAssignment.shape.id
})

export type GetQuizAssignmentDetailsRequest = TypeOf<
  typeof getQuizAssignmentDetailsRequest
>
