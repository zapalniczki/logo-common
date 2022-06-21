import { object, TypeOf } from 'zod'
import { question } from '../../../db'

export const startQuizAttemptResponse = object({
  index: question.shape.index
})

export type StartQuizAttemptResponse = TypeOf<typeof startQuizAttemptResponse>
