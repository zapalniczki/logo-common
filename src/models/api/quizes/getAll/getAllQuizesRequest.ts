import { getQueryParams, getSortingQuery } from 'helpers'
import { enum as zenum, object, TypeOf } from 'zod'
import { quiz, teacher } from '../../../db'

const sortingKeys = zenum(['NAME'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

const querySchema = object({
  teacher_id: teacher.shape.id,
  quizCategory: quiz.shape.category.optional(),
  level: quiz.shape.level.optional()
})

export const getAllQuizesRequest = getQueryParams(querySchema, sortingKeys)
export type GetAllQuizesRequest = TypeOf<typeof getAllQuizesRequest>
