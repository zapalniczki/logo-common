import { Request, Response } from 'express'
import { array, object } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizAttempt } from '../../../models'
import { getData, parseData, sendError } from '../../../utils'
import { queryParams, QueryParams } from './input'
import { responseBody, ResponseBody } from './output'

const getAnswers = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody[]>
) => {
  try {
    const query = parseData(queryParams, req.query)

    const answersData = await sql.begin(async (sql) => {
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

      // GETTING QUESTION ANSWERS
      const answersQuery = await sql`
        SELECT
          ${sql(DB_TABLES.ANSWERS)}.is_correct AS is_correct,
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.value AS value,
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.id AS id,
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.explanation AS explanation

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
          AND
          ${sql(DB_TABLES.QUESTIONS)}.index
          =
          ${query.question_index}

        LEFT JOIN
          ${sql(DB_TABLES.QUESTION_INSTANCES)}
        ON
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.question_id
          =
          ${sql(DB_TABLES.QUESTIONS)}.id
          AND
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
          =
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

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
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.id

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${query.quiz_attempt_id}
      `

      const answersData = parseData(array(responseBody), answersQuery)

      return answersData
    })

    res.send(answersData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const quizAttemptSchema = object({
  is_started: quizAttempt.shape.is_started
})

export default getAnswers
