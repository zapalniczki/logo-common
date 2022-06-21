import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { Student, Teacher } from '../../../models'

const getRoleQuery = (teacherId?: Teacher['id'], studentId?: Student['id']) => {
  let roleQuery = sql``
  if (teacherId) {
    roleQuery = sql`
      ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.teacher_id
      =
      ${teacherId}
    `
  }

  if (studentId) {
    roleQuery = sql`
      ${sql(DB_TABLES.STUDENTS)}.id
      =
      ${studentId}
    `
  }

  return roleQuery
}

export default getRoleQuery
