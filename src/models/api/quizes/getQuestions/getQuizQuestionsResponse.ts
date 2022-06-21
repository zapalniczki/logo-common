import { array, object, TypeOf } from 'zod'
import { answer, question } from '../../../db'

const betaSchema = object({
  id: question.shape.id,
  content: question.shape.content,
  points: question.shape.points,
  index: question.shape.index
})

const cetaSchema = object({
  id: answer.shape.id,
  value: answer.shape.value,
  is_correct: answer.shape.is_correct,
  explanation: answer.shape.explanation
})

const getQuizQuestionsResponse = betaSchema.extend({
  answers: array(cetaSchema)
})

export type GetQuizQuestionsResponse = TypeOf<typeof getQuizQuestionsResponse>
