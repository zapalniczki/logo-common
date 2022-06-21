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
import {
  getSorting,
  QueryParams,
  queryParams as queryParamsSchema
} from './input'
import { ResponseBody, responseBody } from './output'

const getAll = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)
    const userParams = await validateSingleUser(queryParams)

    const paginationQuery = getPaginator(queryParams)
    const sortingQuery = getSorting(queryParams)

    if (userParams.school_id) {
      const listQuery = await sql`
        SELECT
          COUNT(*) OVER() AS count,
          ${sql(DB_TABLES.TEACHERS)}.name AS name,
          ${sql(DB_TABLES.TEACHERS)}.surname AS surname,
          ${sql(DB_TABLES.TEACHERS)}.id AS id

        FROM
          ${sql(DB_TABLES.TEACHERS)}

        WHERE
          ${sql(DB_TABLES.TEACHERS)}.school_id = ${userParams.school_id}

        ${sortingQuery}

        ${paginationQuery}
  `

      const response = getListResponse(responseBody, listQuery, queryParams)
      res.send(response)
    }
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getAll
