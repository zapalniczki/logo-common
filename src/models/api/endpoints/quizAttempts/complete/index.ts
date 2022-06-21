import { Request, Response } from 'express'
import { array, object } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizAttempt } from '../../../models'
import { getData, getTimestamp, parseData, sendError } from '../../../utils'
import { requestQuery, RequestQuery } from './input'

const complete = async (
  req: Request<undefined, undefined, undefined, RequestQuery>,
  res: Response
) => {
  try {
    const query = parseData(requestQuery, req.query)
    const timestamp = getTimestamp()

    await sql.begin(async (sql) => {
      const attemptQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${query.quiz_attempt_id}
      `

      const attemptParsed = parseData(array(attemptSchema), attemptQuery)
      const attemptData = getData(attemptParsed)

      if (!attemptData.is_started) {
        throw new Error('Quiz attempt is not started')
      }

      if (!attemptData.is_completed) {
        await sql`
          UPDATE
            ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

          VALUES
            SET (is_completed, completed_at) = (TRUE, ${timestamp})

          WHERE
            id
            =
            ${query.quiz_attempt_id}
        `
      }
    })

    res.sendStatus(204)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const attemptSchema = object({
  is_completed: quizAttempt.shape.is_completed,
  is_started: quizAttempt.shape.is_started
})

export default complete
