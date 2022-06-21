import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quiz, quizInstance } from '../../models'
import { getData, parseData, sendError } from '../../utils'

const getDetails = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const response = await sql`
      SELECT
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.name AS name,
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.index AS index,
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.id AS id,
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.quiz_id AS quiz_id,
        ${sql(DB_TABLES.QUIZES)}.category AS category

      FROM
        ${sql(DB_TABLES.QUIZ_INSTANCES)}

      LEFT JOIN
        ${sql(DB_TABLES.QUIZES)}
      ON
        ${sql(DB_TABLES.QUIZES)}.id
        =
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.quiz_id

      WHERE
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.id
        =
        ${queryParams.quiz_instance_id}
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
  quiz_instance_id: quizInstance.shape.id
})
type QueryParams = TypeOf<typeof queryParamsSchema>

const responseBodySchema = object({
  name: quizInstance.shape.name,
  index: quizInstance.shape.index,
  id: quizInstance.shape.id,
  quiz_id: quizInstance.shape.quiz_id,
  category: quiz.shape.category
})

type ResponseBody = TypeOf<typeof responseBodySchema>

export default getDetails
