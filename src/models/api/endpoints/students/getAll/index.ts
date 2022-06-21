import { Request, Response } from 'express'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import {
  getListResponse,
  getPaginator,
  getTeacherSchool,
  parseData,
  sendError,
  validateSingleUser
} from '../../../utils'
import { getSorting, QueryParams, queryParams } from './input'
import { responseBody, ResponseBody } from './output'

const getAll = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)
    const userParams = await validateSingleUser(query)

    const paginationQuery = getPaginator(query)
    const sortingQuery = getSorting(query)

    let usedSchoolId = userParams.school_id
    if (userParams?.teacher_id) {
      usedSchoolId = await getTeacherSchool(userParams.teacher_id)
    }

    if (usedSchoolId) {
      const listQuery = await sql`
        SELECT
          COUNT(*) OVER() AS count,
          ${sql(DB_TABLES.STUDENTS)}.name AS name,
          ${sql(DB_TABLES.STUDENTS)}.surname AS surname,
          ${sql(DB_TABLES.STUDENTS)}.email AS email,
          ${sql(DB_TABLES.STUDENTS)}.id AS id,
          ${sql(DB_TABLES.STUDENTS)}.email_confirmed AS email_confirmed,
          ${sql(DB_TABLES.COHORTS)}.year AS cohort,
          CONCAT(
            ${sql(DB_TABLES.GROUPS)}.level,
            ${sql(DB_TABLES.GROUPS)}.letter
          ) AS group

        FROM
          ${sql(DB_TABLES.COHORTS)}

        LEFT JOIN
          ${sql(DB_TABLES.GROUPS)}
        ON
          ${sql(DB_TABLES.GROUPS)}.cohort_id = ${sql(DB_TABLES.COHORTS)}.id

        LEFT JOIN
          ${sql(DB_TABLES.STUDENTS)}
        ON
          ${sql(DB_TABLES.STUDENTS)}.group_id = ${sql(DB_TABLES.GROUPS)}.id

        WHERE
          ${sql(DB_TABLES.COHORTS)}.school_id = ${usedSchoolId}
          AND
          ${sql(DB_TABLES.COHORTS)}.is_current = TRUE


        ${sortingQuery}

        ${paginationQuery}
      `

      const response = getListResponse(responseBody, listQuery, query)
      res.send(response)
    }
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getAll
