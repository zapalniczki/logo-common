import { Request, Response } from 'express'
import { array } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { parseData, sendError } from '../../../utils'
import { QueryParams, queryParams } from './input'
import { ResponseBody, responseBody } from './output'

const getSkeleton = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody[]>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const skeletonData = await sql.begin(async (sql) => {
      const skeletonQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUESTIONS)}.index AS index,

        (CASE
          WHEN
            CAST(COUNT(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) AS SMALLINT) = 0
          THEN
            'NO_ATTEMPT'

          WHEN
            (CASE
              WHEN CAST(SUM(${sql(
                DB_TABLES.ANSWER_ATTEMPTS
              )}.score) AS FLOAT4) IS NOT NULL
              THEN CAST(SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) AS FLOAT4)
              ELSE 0
            END) = 0
          THEN 'FAIL'

          WHEN
            (CASE
              WHEN CAST(SUM(${sql(
                DB_TABLES.ANSWER_ATTEMPTS
              )}.score) AS FLOAT4) IS NOT NULL
              THEN CAST(SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) AS FLOAT4)
              ELSE 0
            END) =  ${sql(DB_TABLES.QUESTIONS)}.points
          THEN 'CORRECT'

          ELSE 'PARTIAL'

        END) AS result

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
          ${sql(DB_TABLES.QUESTION_INSTANCES)}
        ON
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.question_id
          =${sql(DB_TABLES.QUESTIONS)}.id

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
            AND
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
          =
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

        GROUP BY
          ${sql(DB_TABLES.QUESTIONS)}.index,
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.content,
          ${sql(DB_TABLES.QUESTIONS)}.points,
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.id

        ORDER BY
          ${sql(DB_TABLES.QUESTIONS)}.index ASC
      `

      const skeletonData = parseData(array(responseBody), skeletonQuery)

      return skeletonData
    })

    res.send(skeletonData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getSkeleton
