import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { quiz, teacher } from '../../../db'

export const getAllQuizesRequestSortingKeys = zenum(['NAME'])
export type GetAllQuizesRequestSortingKeys = TypeOf<
  typeof getAllQuizesRequestSortingKeys
>

export const getAllQuizesRequestSortingQuery = getSortingQuery(
  getAllQuizesRequestSortingKeys
)
export type GetAllQuizesRequestSortingQuery = TypeOf<
  typeof getAllQuizesRequestSortingQuery
>

const getAllQuizesRequestSchema = object({
  teacher_id: teacher.shape.id,
  quizCategory: quiz.shape.category.optional(),
  level: quiz.shape.level.optional()
})

export const getAllQuizesRequest = getQueryParams(
  getAllQuizesRequestSchema,
  getAllQuizesRequestSortingKeys
)
export type GetAllQuizesRequest = TypeOf<typeof getAllQuizesRequest>
