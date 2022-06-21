import { object, TypeOf } from 'zod'
import { answer, answerInstance } from '../../../models'

export const responseBody = object({
  is_correct: answer.shape.is_correct,
  value: answerInstance.shape.value,
  id: answerInstance.shape.id,
  explanation: answerInstance.shape.explanation
})

export type ResponseBody = TypeOf<typeof responseBody>
