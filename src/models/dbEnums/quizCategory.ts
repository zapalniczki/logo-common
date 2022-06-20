import { enum as zenum, TypeOf } from 'zod'

export const quizCategory = zenum([
  'CATEGORY_1',
  'CATEGORY_2',
  'CATEGORY_3',
  'CATEGORY_4'
])

export type QuizCategory = TypeOf<typeof quizCategory>
