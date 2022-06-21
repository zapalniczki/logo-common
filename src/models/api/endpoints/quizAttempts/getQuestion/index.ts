import { Request, Response } from 'express'
import { array, object } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizAssignment, quizAttempt } from '../../../models'
import { getData, parseData, sendError } from '../../../utils'
import { QueryParams, queryParams } from './input'

import { responseBody, ResponseBody } from './output'

const getQuestion = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const questionData = await sql.begin(async (sql) => {
      // CHECKING IF QUIZ ATTEMPT IS STARTED
      const quizAttemptQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started AS is_started

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${query.quiz_attempt_id}
      `

      const quizAttemptParsed = parseData(
        array(quizAttemptSchema).nonempty(),
        quizAttemptQuery
      )
      const quizAttemptData = getData(quizAttemptParsed)

      if (!quizAttemptData.is_started) {
        throw new Error('Quiz attempt has not been started')
      }

      // GETTING QUESTION INFORMATION
      const questionData = await sql`
        SELECT
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.content
        AS content,

        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed
        AS is_quiz_attempt_completed,

          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.started_at
          AS started_at,

          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.allowed_question_attempts
          AS allowed_question_attempts,

          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.attempt_time
          AS attempt_time,

          ${sql(DB_TABLES.QUESTIONS)}.points
          AS points,

          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.allowed_question_attempts
          AS allowed_question_attempts,

          ${sql(DB_TABLES.QUESTIONS)}.index
          AS index,

          (
            ${sql(DB_TABLES.QUESTIONS)}.index
            =
            (
              SELECT
                ${sql(DB_TABLES.QUESTIONS)}.index
                AS index2

              FROM
                ${sql(DB_TABLES.QUESTIONS)}

              WHERE
                ${sql(DB_TABLES.QUESTIONS)}.quiz_id
                =
                ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id

              ORDER BY
                ${sql(DB_TABLES.QUESTIONS)}.index DESC

              LIMIT
                1
            )
          ) AS is_last,

          (
            SELECT
              (CASE
                WHEN SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) IS NULL
                THEN 0

                ELSE SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
              END)

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
              = ${sql(DB_TABLES.QUESTIONS)}.id
                AND
              ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
              = ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

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
              = ${sql(DB_TABLES.ANSWERS)}.id
                AND
              ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
              =${sql(DB_TABLES.QUIZ_INSTANCES)}.id

            RIGHT JOIN
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
              ${sql(DB_TABLES.QUESTIONS)}.index
              =
              ${query.question_index}
          ) AS score,

          (
            SELECT
              CAST(COUNT(*) AS SMALLINT)

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
              = ${sql(DB_TABLES.QUESTIONS)}.id
                AND
              ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
              = ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

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
              = ${sql(DB_TABLES.ANSWERS)}.id
                AND
              ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
              =${sql(DB_TABLES.QUIZ_INSTANCES)}.id

            RIGHT JOIN
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
              ${sql(DB_TABLES.QUESTIONS)}.index
              =
              ${query.question_index}
          ) AS attempt_count,

          (
            SELECT
              ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.answer_instance_id

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
              = ${sql(DB_TABLES.QUESTIONS)}.id
                AND
              ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
              = ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

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
              = ${sql(DB_TABLES.ANSWERS)}.id
                AND
              ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
              =${sql(DB_TABLES.QUIZ_INSTANCES)}.id

            RIGHT JOIN
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
              ${sql(DB_TABLES.QUESTIONS)}.index
              =
              ${query.question_index}

            ORDER BY
              ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.created_at DESC

            FETCH FIRST ROW ONLY
          ) AS last_attempt_answer_instance_id,

          (
            SELECT
              ${sql(DB_TABLES.ANSWERS)}.is_correct

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
              = ${sql(DB_TABLES.QUESTIONS)}.id
                AND
              ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
              = ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

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
              = ${sql(DB_TABLES.ANSWERS)}.id
                AND
              ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
              =${sql(DB_TABLES.QUIZ_INSTANCES)}.id

            RIGHT JOIN
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
              ${sql(DB_TABLES.QUESTIONS)}.index
              =
              ${query.question_index}

            ORDER BY
              ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.created_at DESC

            FETCH FIRST ROW ONLY
          ) AS last_attempt_is_correct

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
          ${sql(DB_TABLES.QUESTIONS)}.index
          =
          ${query.question_index}
          AND
          ${sql(DB_TABLES.QUESTIONS)}.quiz_id
          =
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id

        LEFT JOIN
          ${sql(DB_TABLES.QUESTION_INSTANCES)}
        ON
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
          =
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_instance_id
          AND
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.question_id
          =
          ${sql(DB_TABLES.QUESTIONS)}.id

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${query.quiz_attempt_id}
      `

      const questionParsed = parseData(
        array(
          responseBody.omit({ next_attempt_allowed: true }).extend({
            allowed_question_attempts:
              quizAssignment.shape.allowed_question_attempts
          })
        ),
        questionData
      )
      const responseData = getData(questionParsed)

      return responseData
    })

    const fullResponseData = {
      ...questionData,
      next_attempt_allowed:
        !questionData.last_attempt_is_correct &&
        questionData.attempt_count < questionData.allowed_question_attempts
    }

    res.send(fullResponseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const quizAttemptSchema = object({
  is_started: quizAttempt.shape.is_started
})

export default getQuestion
