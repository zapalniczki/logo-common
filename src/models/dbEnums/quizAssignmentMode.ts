import { enum as zenum, TypeOf } from 'zod'

export const quizAssignmentMode = zenum(['EXERCISE', 'HOMEWORK', 'TEST'])

export type QuizAssignmentMode = TypeOf<typeof quizAssignmentMode>
