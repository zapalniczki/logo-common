import { enum as zenum, TypeOf } from 'zod'

export const questionType = zenum(['SINGLE_ANSWER'])

export type QuestionType = TypeOf<typeof questionType>
