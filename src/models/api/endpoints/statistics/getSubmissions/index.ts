import { Request, Response } from 'express'
import { array } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import {
  getPagination,
  getPaginator,
  parseData,
  sendError,
  validateSingleUser
} from '../../../utils'
import getResponse from './getResponse'
import getRoleQuery from './getRoleQuery'
import { getSorting, queryParams, QueryParams } from './input'
import { quizAttemptsWithScore, ResponseBody, responseBody } from './output'

const getSubmissions = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)
    const userParams = await validateSingleUser(query)

    const roleQuery = getRoleQuery(userParams.teacher_id, userParams.student_id)
    const paginatorQuery = getPaginator(query)

    const sortingQuery = getSorting(query)

    const quizAttemptsWithScoreQuery = await sql`
      WITH ALFA AS (
        SELECT
          COUNT(*) OVER() as count,
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.pass_threshold AS pass_threshold,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id AS id,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at AS completed_at,
          ${sql(DB_TABLES.QUIZES)}.name AS quiz_name,
          ${sql(DB_TABLES.QUIZES)}.category AS quiz_category,
          ${sql(DB_TABLES.STUDENTS)}.name AS student_name,
          ${sql(DB_TABLES.STUDENTS)}.surname AS student_surname,

          CAST(
            SUM(${sql(DB_TABLES.QUESTIONS)}.points)
          AS SMALLINT) AS points

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        LEFT JOIN
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}
        ON
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
          =
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id

        LEFT JOIN
          ${sql(DB_TABLES.STUDENTS)}
        ON
          ${sql(DB_TABLES.STUDENTS)}.id
          =
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.student_id

        LEFT JOIN
          ${sql(DB_TABLES.GROUPS)}
        ON
          ${sql(DB_TABLES.GROUPS)}.id
          =
          ${sql(DB_TABLES.STUDENTS)}.group_id

        LEFT JOIN
          ${sql(DB_TABLES.COHORTS)}
        ON
          ${sql(DB_TABLES.COHORTS)}.id
          =
          ${sql(DB_TABLES.GROUPS)}.cohort_id

        LEFT JOIN
          ${sql(DB_TABLES.QUIZES)}
        ON
          ${sql(DB_TABLES.QUIZES)}.id
          =
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id

        LEFT JOIN
          ${sql(DB_TABLES.QUESTIONS)}
        ON
          ${sql(DB_TABLES.QUESTIONS)}.quiz_id
          =
          ${sql(DB_TABLES.QUIZES)}.id

        WHERE
          ${roleQuery}

          AND

          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed
          = TRUE

          AND

          ${sql(DB_TABLES.COHORTS)}.is_current
          = TRUE


        GROUP BY
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id,
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.pass_threshold,
          ${sql(DB_TABLES.QUIZES)}.name,
          ${sql(DB_TABLES.QUIZES)}.category,
          ${sql(DB_TABLES.STUDENTS)}.name,
          ${sql(DB_TABLES.STUDENTS)}.surname

        ${sortingQuery}

        ${paginatorQuery}
      )

      SELECT
        *,

        (
          SELECT
            (CASE
              WHEN
                SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) IS NULL
              THEN
                CAST(0 AS SMALLINT)

              ELSE
                CAST(
                  SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
                AS FLOAT4)
            END) AS score

          FROM
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

          LEFT JOIN
            ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}
          ON
            ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
            =
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id

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
            =
            ${sql(DB_TABLES.QUESTIONS)}.id

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
            ALFA.id
            AND
            ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
            =
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_instance_id
            AND
            ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
            =
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_instance_id

          GROUP BY
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id

          ORDER BY
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at DESC
        ) as score

      FROM
        ALFA
    `

    const quizAttemptsWithScoreParsed = parseData(
      array(quizAttemptsWithScore),
      quizAttemptsWithScoreQuery
    )

    const response2 = getResponse(quizAttemptsWithScoreParsed)
    const responseParsed = parseData(responseBody.shape.list, response2)

    const response = {
      pagination: getPagination(query, quizAttemptsWithScoreQuery),
      list: responseParsed
    }

    res.send(response)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default getSubmissions
