import { Request, Response } from 'express'
import { array, object } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizAssignment } from '../../../models'
import {
  getCount,
  getData,
  getListResponse,
  getPaginator,
  parseData,
  sendError,
  validateSingleUser
} from '../../../utils'
import {
  getSorting,
  QueryParams,
  queryParams as queryParamsSchema
} from './input'
import { responseBody, ResponseBody } from './output'

const getAll = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)
    const userParams = await validateSingleUser(queryParams)

    const paginationQuery = getPaginator(queryParams)
    const sortingQuery = getSorting(queryParams)

    if (userParams.student_id) {
      const [listQuery, allowedQuizAttempts, notCompletedAttemptCount] =
        await sql.begin(async (sql) => {
          const attemptsCompletedSoFarQuery = await sql`
        SELECT
          COUNT(*)

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.student_id
          =
          ${queryParams.student_id}
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id
          =
          ${queryParams.quiz_assignment_id}
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed
          =
          FALSE
      `

          const notCompletedAttemptCount = getCount(attemptsCompletedSoFarQuery)

          const quizAssignmentQuery = await sql`
          SELECT
            ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.allowed_quiz_attempts
            AS
            allowed_quiz_attempts

          FROM
            ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}

          WHERE
            ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
            =
            ${queryParams.quiz_assignment_id}
        `

          const quizAssignmentParsed = parseData(
            array(quizAssignmentSchema).nonempty(),
            quizAssignmentQuery
          )
          const quizAssignmentData = getData(quizAssignmentParsed)
          const allowedQuizAttempts = quizAssignmentData.allowed_quiz_attempts

          const listQuery = await sql`
          SELECT
            COUNT(*) OVER() AS count,

            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id AS id,
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started AS is_started,
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed AS is_completed,
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.created_at AS created_at,
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.started_at AS started_at,
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at AS completed_at,
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.display_name AS display_name,
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.index AS index,

            (
              SELECT
                CAST(SUM(${sql(DB_TABLES.QUESTIONS)}.points) AS SMALLINT)

              FROM
                ${sql(DB_TABLES.QUESTIONS)}

              WHERE
                ${sql(DB_TABLES.QUESTIONS)}.quiz_id
                =
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id
            ) AS points,

            (
              SELECT
                (CASE
                  WHEN SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) IS NULL
                  THEN 0

                  ELSE SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
                END)

              FROM
                ${sql(DB_TABLES.ANSWER_ATTEMPTS)}

              WHERE
                ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id
                =
                ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id

            ) AS score,

            (
              WITH ALFA AS (
                SELECT
                  ${sql(DB_TABLES.ANSWER_INSTANCES)}.id
                  AS
                  answer_instance_id,

                  ${sql(DB_TABLES.QUESTIONS)}.id
                  AS
                  question_id

                FROM
                  ${sql(DB_TABLES.QUESTIONS)}

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

                  AND

                  ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
                  =
                  ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_instance_id

                WHERE
                  ${sql(DB_TABLES.QUESTIONS)}.quiz_id
                  =
                  ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id
              ),

              BETA AS (
                SELECT
                  *,
                  (
                    SELECT
                      COUNT(*)

                    FROM
                      ${sql(DB_TABLES.ANSWER_ATTEMPTS)}

                    WHERE
                      ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.answer_instance_id
                      =
                      ALFA.answer_instance_id

                      AND

                      ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id
                      =
                      ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
                  ) AS answer_attempt_count

                FROM
                  ALFA
              ),

              CETA AS (
                SELECT
                  SUM(BETA.answer_attempt_count)::SMALLINT
                  AS
                  question_attempt_count

                FROM
                  BETA

                GROUP BY
                  BETA.question_id
              ),

              DELTA AS (
                SELECT
                  (CASE
                    WHEN CETA.question_attempt_count != 0
                    THEN 1

                    ELSE 0
                  END) AS total

                FROM
                  CETA
              )

              SELECT
                SUM(DELTA.total)::SMALLINT

              FROM
                DELTA
            )AS questions_left,

            (
              SELECT
                CAST(SUM(${sql(DB_TABLES.QUESTIONS)}.points) AS SMALLINT)

              FROM
                ${sql(DB_TABLES.QUESTIONS)}

              WHERE
                ${sql(DB_TABLES.QUESTIONS)}.quiz_id
                =
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id

            ) AS question_count,

            (
              (
                SELECT
                  (CASE
                    WHEN SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) IS NULL
                    THEN 0

                    ELSE SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
                  END)

                FROM
                  ${sql(DB_TABLES.ANSWER_ATTEMPTS)}

                WHERE
                  ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id
                  =
                  ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id

              )

              /

              (
                SELECT
                  CAST(SUM(${sql(DB_TABLES.QUESTIONS)}.points) AS SMALLINT)

                FROM
                  ${sql(DB_TABLES.QUESTIONS)}

                WHERE
                  ${sql(DB_TABLES.QUESTIONS)}.quiz_id
                  =
                  ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id
              )

              *

              100
            ) AS percentage_score,

            (CASE
              WHEN
                ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed IS TRUE
              THEN
                'COMPLETED'

              WHEN
                ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started IS TRUE
              THEN
                'STARTED'

              ELSE
                'NEW'
            END) AS status,

            (CASE
              WHEN ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.pass_threshold IS NULL
              THEN 'NEUTRAL'

              WHEN (
                (
                  (
                    SELECT
                      (CASE
                        WHEN SUM(${sql(
                          DB_TABLES.ANSWER_ATTEMPTS
                        )}.score) IS NULL
                        THEN 0

                        ELSE SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
                      END)

                    FROM
                      ${sql(DB_TABLES.ANSWER_ATTEMPTS)}

                    WHERE
                      ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id
                      =
                      ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id

                  )

                  /

                  (
                    SELECT
                      CAST(SUM(${sql(DB_TABLES.QUESTIONS)}.points) AS SMALLINT)

                    FROM
                      ${sql(DB_TABLES.QUESTIONS)}

                    WHERE
                      ${sql(DB_TABLES.QUESTIONS)}.quiz_id
                      =
                      ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id
                  )

                  *

                  100
                )

                >=

                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.pass_threshold
              )

              THEN 'PASS'

              ELSE 'FAIL'

            END) AS result

          FROM
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

          LEFT JOIN
            ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}
          ON
            ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id
            =
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id


          WHERE
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.student_id
            =
            ${userParams.student_id}
            AND
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id
            =
            ${queryParams.quiz_assignment_id}

          ${sortingQuery}

          ${paginationQuery}
        `

          return [listQuery, allowedQuizAttempts, notCompletedAttemptCount]
        })

      const hasLessAttemptsThanAllowed = allowedQuizAttempts
        ? listQuery.length < allowedQuizAttempts
        : true

      const hasLessThanFiveNotCompletedAttempts = notCompletedAttemptCount < 5
      const canAddNew =
        hasLessAttemptsThanAllowed && hasLessThanFiveNotCompletedAttempts

      const permissions: ResponseBody['permissions'] = []
      if (canAddNew) {
        permissions.push('ADD_NEW')
      }

      const listResponse = getListResponse(responseBody, listQuery, queryParams)

      const response = {
        ...listResponse,
        permissions
      }

      const responseParsed = parseData(responseBody, response)

      res.send(responseParsed)
    }
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const quizAssignmentSchema = object({
  allowed_quiz_attempts: quizAssignment.shape.allowed_quiz_attempts
})

export default getAll
