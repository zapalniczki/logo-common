import { number, string, TypeOf } from 'zod'
import { quiz } from './quiz'
import { tableBase } from './tableBase'

export const question = tableBase.extend({
  content: string(),
  quiz_id: quiz.shape.id,
  index: number(),
  points: number()
})

export type Question = TypeOf<typeof question>
