import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { school } from '../../models'
import { getData, parseData, sendError } from '../../utils'

const getDetails = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const response = await sql<ResponseBody[]>`
      SELECT
        ${sql(DB_TABLES.SCHOOLS)}.name as name,
        ${sql(DB_TABLES.SCHOOLS)}.email as email,
        ${sql(DB_TABLES.SCHOOLS)}.id as id

      FROM
        ${sql(DB_TABLES.SCHOOLS)}

      WHERE
        ${sql(DB_TABLES.SCHOOLS)}.id = ${queryParams.school_id}
  `

    const responseParsed = parseData(
      array(responseBodySchema).nonempty(),
      response
    )
    const responseData = getData(responseParsed)

    res.send(responseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const queryParamsSchema = object({
  school_id: school.shape.id
})
type QueryParams = TypeOf<typeof queryParamsSchema>

const responseBodySchema = school.pick({
  name: true,
  email: true,
  id: true
})

type ResponseBody = TypeOf<typeof responseBodySchema>

export default getDetails
