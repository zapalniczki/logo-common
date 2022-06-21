import { Request, Response } from 'express'
import { array, object } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizAttempt } from '../../../models'
import { getData, getTimestamp, parseData, sendError } from '../../../utils'
import { requestQuery, RequestQuery } from './input'
import { ResponseBody, responseBody } from './output'

const start = async (
  req: Request<undefined, undefined, undefined, RequestQuery>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(requestQuery, req.query)
    const timestamp = getTimestamp()

    const firstQuestionIndex = await sql.begin(async (sql) => {
      // CHECKING IF ATTEMPT IS STARTED
      const quizAttemptQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started

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
      const isQuizAttemptStarted = quizAttemptData.is_started

      if (!isQuizAttemptStarted) {
        await sql`
          UPDATE
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

          VALUES
            SET (is_started, started_at) = (TRUE, ${timestamp})

            WHERE
            id = ${query.quiz_attempt_id}
        `
      }

      const firstQuestionQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUESTIONS)}.index AS index

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

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id = ${query.quiz_attempt_id}

        ORDER BY
          ${sql(DB_TABLES.QUESTIONS)}.index

        LIMIT 1
      `

      const firstQuestionParsed = parseData(
        array(responseBody).nonempty(),
        firstQuestionQuery
      )
      const firstQuestionData = getData(firstQuestionParsed)
      const firstQuestionIndex = firstQuestionData.index

      return firstQuestionIndex
    })

    const response = {
      index: firstQuestionIndex
    }

    res.send(response)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const quizAttemptSchema = object({
  is_started: quizAttempt.shape.is_started
})

export default start
