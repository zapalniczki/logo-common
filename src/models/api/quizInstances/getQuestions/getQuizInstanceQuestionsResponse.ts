import { array, object, TypeOf } from 'zod'
import { answer, answerInstance, question, questionInstance } from '../../../db'

const beta = object({
  id: questionInstance.shape.id,
  content: questionInstance.shape.content,
  points: question.shape.points,
  index: question.shape.index
})

const ceta = object({
  id: answerInstance.shape.id,
  value: answerInstance.shape.value,
  is_correct: answer.shape.is_correct,
  explanation: answerInstance.shape.explanation
})

export const getQuizInstanceQuestionsResponse = beta.extend({
  answers: array(ceta)
})

export type GetQuizInstanceQuestionsResponse = TypeOf<
  typeof getQuizInstanceQuestionsResponse
>
