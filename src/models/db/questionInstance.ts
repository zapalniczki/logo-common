import { string, TypeOf } from 'zod'
import { tableBase } from './tableBase'
import { quizInstance } from './quizInstance'
import { question } from './question'

export const questionInstance = tableBase.extend({
  content: string(),
  quiz_instance_id: quizInstance.shape.id,
  question_id: question.shape.id
})

export type QuestionInstance = TypeOf<typeof questionInstance>
