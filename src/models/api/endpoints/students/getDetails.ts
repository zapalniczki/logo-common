import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { student } from '../../models'
import { getData, parseData, sendError } from '../../utils'

const getDetails = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const response = await sql<ResponseBody[]>`
      SELECT
        ${sql(DB_TABLES.STUDENTS)}.name as name,
        ${sql(DB_TABLES.STUDENTS)}.surname as surname,
        ${sql(DB_TABLES.STUDENTS)}.email as email,
        ${sql(DB_TABLES.STUDENTS)}.id as id

      FROM
        ${sql(DB_TABLES.STUDENTS)}

      WHERE
        ${sql(DB_TABLES.STUDENTS)}.id = ${queryParams.student_id}
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
  student_id: student.shape.id
})
type QueryParams = TypeOf<typeof queryParamsSchema>

const responseBodySchema = student.pick({
  name: true,
  email: true,
  id: true,
  surname: true
})

type ResponseBody = TypeOf<typeof responseBodySchema>

export default getDetails
