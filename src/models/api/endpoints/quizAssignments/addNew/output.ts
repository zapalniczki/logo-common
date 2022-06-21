import { object, TypeOf } from 'zod'
import { quizAssignment } from '../../../models'

export const responseBody = object({
  quiz_assignment_id: quizAssignment.shape.id
})

export type ResponseBody = TypeOf<typeof responseBody>
