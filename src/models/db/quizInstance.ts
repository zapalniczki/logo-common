import { number, string, TypeOf } from 'zod'
import { teacher } from './teacher'
import { quiz } from './quiz'
import { tableBase } from './tableBase'

export const quizInstance = tableBase.extend({
  quiz_id: quiz.shape.id,
  name: string(),
  teacher_id: teacher.shape.id,
  index: number().positive()
})

export type QuizInstance = TypeOf<typeof quizInstance>
