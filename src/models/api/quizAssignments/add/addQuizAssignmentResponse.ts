import { object, TypeOf } from 'zod'
import { quizAssignment } from '../../../db'

export const addQuizAssignmentResponse = object({
  quiz_assignment_id: quizAssignment.shape.id
})

export type AddQuizAssignmentResponse = TypeOf<typeof addQuizAssignmentResponse>
