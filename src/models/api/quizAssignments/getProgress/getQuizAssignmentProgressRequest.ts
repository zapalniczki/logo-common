import { object, TypeOf } from 'zod'
import { quizAssignment } from '../../../db'

export const getQuizAssignmentProgressRequest = object({
  quiz_assignment_id: quizAssignment.shape.id
})

export type GetQuizAssignmentProgressRequest = TypeOf<
  typeof getQuizAssignmentProgressRequest
>
