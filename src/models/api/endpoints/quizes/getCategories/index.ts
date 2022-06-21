import { Request, Response } from 'express'
import { array } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { parseData, sendError, validateSingleUser } from '../../../utils'
import getFiltersQuery from './getFiltersQuery'
import { QueryParams, queryParams } from './input'
import { ResponseBody, responseBody } from './output'

const getCategories = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody[]>
) => {
  try {
    const query = parseData(queryParams, req.query)
    const userParams = await validateSingleUser(query)

    const filterQuery = getFiltersQuery(query)

    if (userParams.teacher_id) {
      const response = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZES)}.category AS category,
          CAST(COUNT(*) AS SMALLINT) as quiz_count

        FROM
          ${sql(DB_TABLES.QUIZES)}

        ${filterQuery}

        GROUP BY
          ${sql(DB_TABLES.QUIZES)}.category
      `

      const dataParsed = parseData(array(responseBody), response)
      res.send(dataParsed)
    }
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getCategories
