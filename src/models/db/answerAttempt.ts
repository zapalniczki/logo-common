import { number, TypeOf } from 'zod'
import { answerInstance } from './answerInstance'
import { quizAttempt } from './quizAttempt'
import { tableBase } from './tableBase'

export const answerAttempt = tableBase.extend({
  answer_instance_id: answerInstance.shape.id,
  quiz_attempt_id: quizAttempt.shape.id,
  score: number()
})

export type AnswerAttempt = TypeOf<typeof answerAttempt>
