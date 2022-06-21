import { object, TypeOf } from 'zod'
import { quizAssignment } from '../../../models'

export const queryParams = object({
  quiz_assignment_id: quizAssignment.shape.id
})

export type QueryParams = TypeOf<typeof queryParams>
