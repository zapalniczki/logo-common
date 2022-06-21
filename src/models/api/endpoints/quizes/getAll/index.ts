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
import { getFiltersQuery, getSorting, queryParams, QueryParams } from './input'
import { ResponseBody, responseBody } from './output'

const getAll = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const filtersQuery = getFiltersQuery(query)
    const paginatorQuery = getPaginator(query)
    const sortingQuery = getSorting(query)
    const userParams = await validateSingleUser(query)

    if (userParams.teacher_id) {
      const listQuery = await sql`
        SELECT
          COUNT(*) OVER() AS count,
          ${sql(DB_TABLES.QUIZES)}.category AS category,
          ${sql(DB_TABLES.QUIZES)}.id AS id,
          ${sql(DB_TABLES.QUIZES)}.introduction AS introduction,
          ${sql(DB_TABLES.QUIZES)}.name AS name,
          (
            SELECT
              CAST(COUNT(*) AS SMALLINT)

            FROM
              ${sql(DB_TABLES.QUESTIONS)}

            WHERE
              ${sql(DB_TABLES.QUESTIONS)}.quiz_id
              =
              ${sql(DB_TABLES.QUIZES)}.id
          ) AS question_count,
          (
            SELECT
              CAST(COUNT(*) AS SMALLINT)

            FROM
              ${sql(DB_TABLES.QUIZ_INSTANCES)}

            WHERE
              ${sql(DB_TABLES.QUIZ_INSTANCES)}.quiz_id
              =
              ${sql(DB_TABLES.QUIZES)}.id

              AND

              ${sql(DB_TABLES.QUIZ_INSTANCES)}.teacher_id
              =
              ${userParams.teacher_id}
          ) AS instance_count

        FROM
          ${sql(DB_TABLES.QUIZES)}

        ${filtersQuery}

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
