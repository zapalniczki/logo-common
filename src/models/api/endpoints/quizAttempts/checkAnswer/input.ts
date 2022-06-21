import { object, TypeOf } from 'zod'
import { question, answerInstance, quizAttempt } from '../../../models'

export const requestBody = object({
  question_index: question.shape.index,
  answer_instance_id: answerInstance.shape.id,
  quiz_attempt_id: quizAttempt.shape.id
})

export type RequestBody = TypeOf<typeof requestBody>
