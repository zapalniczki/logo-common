import { Request, Response } from 'express'
import { array } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { getData, parseData, sendError } from '../../../utils'
import { queryParams, QueryParams } from './input'
import { responseBody, ResponseBody, responseBodyDetails } from './output'

const getSummary = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const [detailsData, questionsData] = await sql.begin(async (sql) => {
      const detailsQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.started_at AS started_at,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started AS is_started,
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.attempt_time AS attempt_time

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        LEFT JOIN
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}
        ON
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
          =
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${query.quiz_attempt_id}
    `

      const detailsParsed = parseData(
        array(responseBodyDetails).nonempty(),
        detailsQuery
      )
      const detailsData = getData(detailsParsed)

      if (!detailsData.is_started) {
        throw new Error(
          'No allowed to be on summary screen while quiz attempt has not been started'
        )
      }

      const questionsQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUESTIONS)}.index AS index,
          CAST(
            ${sql(DB_TABLES.QUESTIONS)}.index
          AS VARCHAR)AS id,

          (CASE
            WHEN
              CAST(COUNT(${sql(
                DB_TABLES.ANSWER_ATTEMPTS
              )}.score) AS SMALLINT) = 0
            THEN
              TRUE
            ELSE
              FALSE
          END) AS no_attempts,

          CAST(COUNT(${sql(
            DB_TABLES.ANSWER_ATTEMPTS
          )}.score) AS SMALLINT) AS attempt_count,

          CAST(
            MIN(${sql(
              DB_TABLES.QUIZ_ASSIGNMENTS
            )}.allowed_question_attempts) AS SMALLINT
          ) AS allowed_question_attempts

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        LEFT JOIN
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}
        ON
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
          =
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id

        LEFT JOIN
          ${sql(DB_TABLES.QUIZ_INSTANCES)}
        ON
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.id
          =
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_instance_id

        LEFT JOIN
          ${sql(DB_TABLES.QUESTIONS)}
        ON
          ${sql(DB_TABLES.QUESTIONS)}.quiz_id
          =
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id

        LEFT JOIN
          ${sql(DB_TABLES.ANSWERS)}
        ON
          ${sql(DB_TABLES.ANSWERS)}.question_id
          =
          ${sql(DB_TABLES.QUESTIONS)}.id

        LEFT JOIN
          ${sql(DB_TABLES.ANSWER_INSTANCES)}
        ON
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.answer_id
          =
          ${sql(DB_TABLES.ANSWERS)}.id

        LEFT JOIN
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}
        ON
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.answer_instance_id
          =
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.id
            AND
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id
          =
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${query.quiz_attempt_id}
            AND
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
          =
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

        GROUP BY
          ${sql(DB_TABLES.QUESTIONS)}.index

        ORDER BY
          ${sql(DB_TABLES.QUESTIONS)}.index ASC
      `

      const questionsData = parseData(responseBody.shape.list, questionsQuery)

      return [detailsData, questionsData]
    })

    const response = {
      ...detailsData,
      list: questionsData
    }

    const responseData = parseData(responseBody, response)

    res.send(responseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getSummary
