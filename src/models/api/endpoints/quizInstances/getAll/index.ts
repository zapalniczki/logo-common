import { Request, Response } from 'express'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import {
  getListResponse,
  getPaginator,
  parseData,
  sendError,
  validateSingleUser
} from '../../../utils'
import { getSorting, QueryParams, queryParams } from './input'
import { ResponseBody, responseBody } from './output'

const getAll = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const userParams = await validateSingleUser(query)
    const sortingQuery = getSorting(query)
    const paginatorQuery = getPaginator(query)

    if (userParams.teacher_id) {
      const listQuery = await sql`
        SELECT
          COUNT(*) OVER() as count,
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.id AS id,
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.name AS name,
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.index AS index,
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.created_at AS created_at,
          (
            (
              SELECT
                CAST(COUNT(*) AS SMALLINT)

              FROM
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}

              WHERE
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_instance_id
                =
                ${sql(DB_TABLES.QUIZ_INSTANCES)}.id
            ) +
            (
              SELECT
                CAST(COUNT(*) AS SMALLINT)

              FROM
                ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

              LEFT JOIN
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}
              ON
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
                =
                ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id

              WHERE
                ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_instance_id
                =
                ${sql(DB_TABLES.QUIZ_INSTANCES)}.id
                AND
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_instance_id IS NULL
            )
          ) AS use_count

        FROM
          ${sql(DB_TABLES.QUIZ_INSTANCES)}

        LEFT JOIN
          ${sql(DB_TABLES.QUIZES)}
        ON
          ${sql(DB_TABLES.QUIZES)}.id
          =
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.quiz_id

        WHERE
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.quiz_id
          =
          ${query.quiz_id}

          AND

          ${sql(DB_TABLES.QUIZ_INSTANCES)}.teacher_id
          =
          ${userParams.teacher_id}

        ${sortingQuery}

        ${paginatorQuery}
      `

      const response = getListResponse(responseBody, listQuery, queryParams)
      res.send(response)
    }
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getAll
