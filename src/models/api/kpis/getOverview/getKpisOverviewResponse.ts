import { array, enum as zenum, number, object, string, TypeOf } from 'zod'

export const getKpisOverviewResponseKpi = object({
  value: string().or(number()),
  key: zenum([
    'QUIZ_COUNT',
    'GROUP_COUNT',
    'TEACHER_COUNT',
    'STUDENT_COUNT',

    'SCHOOL_COUNT',
    'EXERCISE_COUNT',
    'COHORT_COUNT',
    'HOMEWORK_COUNT',
    'TEST_COUNT'
  ])
})

export const getKpisOverviewResponse = array(getKpisOverviewResponseKpi)
export type GetKpisOverviewResponse = TypeOf<typeof getKpisOverviewResponse>
