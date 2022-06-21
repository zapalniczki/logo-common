import { Request, Response } from 'express'
import { array } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { getData, parseData, sendError } from '../../../utils'
import { QueryParams } from '../getAll/input'
import { queryParams } from './input'
import { responseBody, ResponseBody } from './output'

const getDetails = async (
  req: Request<undefined, ResponseBody, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const responseQuery = await sql`
      SELECT
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id AS id,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started AS is_started,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed AS is_completed,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_instance_id AS quiz_instance_id,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.started_at AS started_at,
        ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.attempt_time AS attempt_time,
        ${sql(DB_TABLES.QUIZES)}.introduction AS quiz_introduction

      FROM
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

      LEFT JOIN
        ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}
      ON
        ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
        =
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id

      LEFT JOIN
        ${sql(DB_TABLES.QUIZES)}
      ON
        ${sql(DB_TABLES.QUIZES)}.id
        =
        ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id

      WHERE
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id = ${query.quiz_attempt_id}
    `

    const responseParsed = parseData(
      array(responseBody).nonempty(),
      responseQuery
    )
    const responseData = getData(responseParsed)

    res.send(responseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getDetails
