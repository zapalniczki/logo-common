import { object, TypeOf } from 'zod'
import { quizAssignment } from '../../../db'

export const addNewQuizAssignmentResponse = object({
  quiz_assignment_id: quizAssignment.shape.id
})

export type AddNewQuizAssignmentResponse = TypeOf<
  typeof addNewQuizAssignmentResponse
>
