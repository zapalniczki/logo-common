import { number, object, TypeOf } from 'zod'
import { getUserSchema } from '../../../../helpers'
import { teacher } from '../../../db'

export const getQuizCategoriesRequestSchema = getUserSchema(object({}))

export type GetQuizCategoriesRequestSchema = TypeOf<
  typeof getQuizCategoriesRequestSchema
>

const getQuizCategoriesRequestFiltersSchema = object({
  level: number().optional()
})

export type GetQuizCategoriesRequestFiltersSchema = TypeOf<
  typeof getQuizCategoriesRequestFiltersSchema
>

export const getQuizCategoriesRequest = getQuizCategoriesRequestSchema.merge(
  getQuizCategoriesRequestFiltersSchema
)

export type GetQuizCategoriesRequest = TypeOf<typeof getQuizCategoriesRequest>
