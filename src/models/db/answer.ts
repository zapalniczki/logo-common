import { boolean, string, TypeOf } from 'zod'
import { question } from './question'
import { tableBase } from './tableBase'

export const answer = tableBase.extend({
  question_id: question.shape.id,
  is_correct: boolean(),
  value: string(),
  explanation: string().nullable()
})

export type Answer = TypeOf<typeof answer>
