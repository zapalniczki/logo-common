import { object, enum as zenum, TypeOf } from 'zod'
import { userRole } from '../..'

const funFactPlacementId = zenum([
  // COHORTS
  'cohorts_add',
  'cohorts_edit',
  'cohorts_list',

  // GROUPS
  'groups_add',
  'groups_edit',
  'groups_list',

  // HELP
  'help_list',

  // OVERVIEW
  'overview',

  // QUIZES
  'quizes_list',
  'quizes_questions',

  // QUIZ_ASSIGNMENTS
  'quiz_assignments_add',
  'quiz_assignments_edit',
  'quiz_assignments_attempts',
  'quiz_assignments_progress',
  'quiz_assignments_list',

  // QUIZ_INSTANCES
  'quiz_instances_list',

  // SCHOOLS
  'schools_add',
  'schools_edit',
  'schools_list',

  // SETTINGS
  'settings',

  // STATISTICS
  'statistics',

  // STUDENTS
  'students_add',
  'students_edit',
  'students_list',

  // SUBMISSIONS
  'submissions_list',

  // TEACHERS
  'teachers_add',
  'teachers_edit',
  'teachers_list'
])
export type FunFactPlacementId = TypeOf<typeof funFactPlacementId>

export const getFunFactContentRequest = object({
  placementId: funFactPlacementId,
  role: userRole
})
export type GetFunFactContentRequest = TypeOf<typeof getFunFactContentRequest>
