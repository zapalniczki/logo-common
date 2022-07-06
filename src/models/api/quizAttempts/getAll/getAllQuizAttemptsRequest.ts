import { enum as zenum, object, TypeOf } from 'zod'
import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { quizAssignment, student } from '../../../db'

export const getAllQuizAttemptsRequestSortingKeys = zenum([
  'DISPLAY_NAME',
  'INDEX'
])
export type GetAllQuizAttemptsRequestSortingKeys = TypeOf<
  typeof getAllQuizAttemptsRequestSortingKeys
>

export const getAllQuizAttemptsRequestSortingKeysSortingQuery = getSortingQuery(
  getAllQuizAttemptsRequestSortingKeys
)
export type GetAllQuizAttemptsRequestSortingKeysSortingQuery = TypeOf<
  typeof getAllQuizAttemptsRequestSortingKeysSortingQuery
>

const getAllQuizAttemptsRequestSchema = object({
  quiz_assignment_id: quizAssignment.shape.id,
  student_id: student.shape.id
})

export const getAllQuizAttemptsRequest = getQueryParams(
  getAllQuizAttemptsRequestSchema,
  getAllQuizAttemptsRequestSortingKeys
)

export type GetAllQuizAttemptsRequest = TypeOf<typeof getAllQuizAttemptsRequest>
