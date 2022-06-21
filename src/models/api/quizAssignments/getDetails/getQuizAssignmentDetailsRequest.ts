import { object, TypeOf } from 'zod'
import { quizAssignment } from '../../../db'

export const getQuizAssignmentDetailsRequest = object({
  quiz_assignment_id: quizAssignment.shape.id
})

export type GetQuizAssignmentDetailsRequest = TypeOf<
  typeof getQuizAssignmentDetailsRequest
>
