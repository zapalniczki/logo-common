import { string, TypeOf } from 'zod'
import { answer } from './answer'
import { tableBase } from './tableBase'

export const answerInstance = tableBase.extend({
  value: string(),
  explanation: string().nullable(),
  answer_id: answer.shape.id
})

export type AnswerInstance = TypeOf<typeof answerInstance>
