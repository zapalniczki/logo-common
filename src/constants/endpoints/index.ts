import ADMINS from './ADMINS'
import AUTH from './AUTH'
import COHORTS from './COHORTS'
import GROUPS from './GROUPS'
import KPIS from './KPIS'
import QUIZ_ASSIGNMENTS from './QUIZ_ASSIGNMENTS'
import QUIZ_ATTEMPTS from './QUIZ_ATTEMPTS'
import QUIZ_INSTANCES from './QUIZ_INSTANCES'
import SCHOOLS from './SCHOOLS'
import STATISTICS from './STATISTICS'
import TEACHERS from './TEACHERS'
import TEMP from './TEMP'
import QUIZES from './QUIZES'
import STUDENTS from './STUDENTS'

const ENDPOINTS = {
  ADMINS,
  AUTH,
  COHORTS,
  GROUPS,
  KPIS,
  QUIZES,
  QUIZ_ASSIGNMENTS,
  QUIZ_ATTEMPTS,
  QUIZ_INSTANCES,
  SCHOOLS,
  STATISTICS,
  STUDENTS,
  TEACHERS,
  TEMP
} as const

export default ENDPOINTS
