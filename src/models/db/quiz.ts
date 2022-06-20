import { quizCategory } from '../dbEnums'
import { number, string, TypeOf } from 'zod'
import { tableBase } from './tableBase'

export const quiz = tableBase.extend({
  name: string(),
  category: quizCategory,
  introduction: string(),
  level: number().int().positive()
})

export type Quiz = TypeOf<typeof quiz>
