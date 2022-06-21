import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { admin, school } from '../../models'
import { parseData, sendError } from '../../utils'

const getAll = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody[]>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const response = await sql<ResponseBody[]>`
      SELECT
        ${sql(DB_TABLES.SCHOOLS)}.name as name,
        ${sql(DB_TABLES.SCHOOLS)}.email as email,
        ${sql(DB_TABLES.SCHOOLS)}.id as id,
        ${sql(DB_TABLES.SCHOOLS)}.email_confirmed as email_confirmed

      FROM
        ${sql(DB_TABLES.SCHOOLS)}

      WHERE
        ${sql(DB_TABLES.SCHOOLS)}.admin_id = ${queryParams.admin_id}
  `

    const responseParsed = parseData(array(responseBodySchema), response)
    const responseData = responseParsed

    res.send(responseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const queryParamsSchema = object({
  admin_id: admin.shape.id
})
type QueryParams = TypeOf<typeof queryParamsSchema>

const responseBodySchema = school.pick({
  name: true,
  email: true,
  id: true,
  email_confirmed: true
})

type ResponseBody = TypeOf<typeof responseBodySchema>

export default getAll
