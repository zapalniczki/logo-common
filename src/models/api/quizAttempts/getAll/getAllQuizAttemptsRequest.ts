import { enum as zenum, object, TypeOf } from 'zod'
import { getQueryParams } from '../../../../helpers'
import { quizAssignment, student } from '../../../db'

const sortingKeys = zenum(['DISPLAY_NAME', 'INDEX'])

const querySchema = object({
  quiz_assignment_id: quizAssignment.shape.id,
  student_id: student.shape.id
})

export const getAllQuizAttemptsRequest = getQueryParams(
  querySchema,
  sortingKeys
)

export type GetAllQuizAttemptsRequest = TypeOf<typeof getAllQuizAttemptsRequest>
