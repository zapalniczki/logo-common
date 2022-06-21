import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quiz } from '../../models'
import {
  appendConditionHeader,
  getData,
  parseData,
  sendError
} from '../../utils'

const getDetails = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const response = await sql<ResponseBody[]>`
      SELECT
        ${sql(DB_TABLES.QUIZES)}.name AS name,
        ${sql(DB_TABLES.QUIZES)}.introduction AS introduction,
        ${sql(DB_TABLES.QUIZES)}.category AS category,
        ${sql(DB_TABLES.QUIZES)}.id AS id

      FROM
        ${sql(DB_TABLES.QUIZES)}

      WHERE
        ${sql(DB_TABLES.QUIZES)}.id = ${queryParams.quiz_id}
  `

    const responseParsed = parseData(
      array(responseBodySchema).nonempty(),
      response
    )
    const responseData = getData(responseParsed)

    appendConditionHeader(res, {
      needsSorting: false,
      needsPagination: false,
      needsFilters: false,
      needsRoles: false,
      needsSimpfying: false,
      needsAuth: true
    })

    res.send(responseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const queryParamsSchema = object({
  quiz_id: quiz.shape.id
})
type QueryParams = TypeOf<typeof queryParamsSchema>

const responseBodySchema = quiz.pick({
  name: true,
  introduction: true,
  category: true,
  id: true
})

type ResponseBody = TypeOf<typeof responseBodySchema>

export default getDetails
