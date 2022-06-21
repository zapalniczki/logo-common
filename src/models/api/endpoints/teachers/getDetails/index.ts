import { Request, Response } from 'express'
import { array } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { getData, parseData, sendError } from '../../../utils'
import { QueryParams, queryParams } from './input'
import { Permissions, ResponseBody, responseSchema, schema } from './output'

const getDetails = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const detailsQuery = await sql`
      SELECT
        ${sql(DB_TABLES.TEACHERS)}.name
        AS name,

        ${sql(DB_TABLES.TEACHERS)}.surname
        AS surname,

        ${sql(DB_TABLES.TEACHERS)}.email
        AS email,

        ${sql(DB_TABLES.TEACHERS)}.id
        AS id,

        ${sql(DB_TABLES.TEACHERS)}.email_confirmed
        AS email_confirmed,

        ${sql(DB_TABLES.TEACHERS)}.blocked
        AS blocked

      FROM
        ${sql(DB_TABLES.TEACHERS)}

      WHERE
        ${sql(DB_TABLES.TEACHERS)}.id = ${query.teacher_id}
    `

    const detailsParsed = parseData(array(schema).nonempty(), detailsQuery)
    const detailsData = getData(detailsParsed)

    const permissions: Permissions[] = []

    if (detailsData.blocked) {
      permissions.push('UNBLOCK')
    }

    if (!detailsData.blocked) {
      permissions.push('BLOCK')
      permissions.push('EDIT')
    }

    const response = {
      ...detailsData,
      permissions
    }

    console.log(response)

    const responseParsed = parseData(responseSchema, response)

    res.send(responseParsed)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getDetails
