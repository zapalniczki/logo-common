import { Request, Response } from 'express'
import { array, object } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import {
  answer,
  answerAttempt,
  question,
  quizAssignment,
  quizAttempt
} from '../../../models'
import { getData, parseData, sendError } from '../../../utils'
import getScore from './getScore'
import { requestBody, RequestBody } from './input'

const checkAnswer = async (
  req: Request<undefined, undefined, RequestBody>,
  res: Response
) => {
  try {
    const body = parseData(requestBody, req.body)

    await sql.begin(async (sql) => {
      // CHECKING IF QUIZ ATTEMPT IS NOT COMPLETED
      const quizAttemptQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_started

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${body.quiz_attempt_id}
      `

      const quizAttemptParsed = parseData(
        array(quizAttemptSchema).nonempty(),
        quizAttemptQuery
      )
      const quizAttemptData = getData(quizAttemptParsed)

      if (quizAttemptData.is_completed) {
        throw new Error('Quiz attempt is already completed')
      }

      if (!quizAttemptData.is_started) {
        throw new Error('Quiz attempt has not been started')
      }

      // GETTING UP TO NOW ATTEMPTS
      const alfa = await sql`
        SELECT
          ${sql(DB_TABLES.ANSWERS)}.is_correct AS is_correct,
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.id AS id

        FROM
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}

        LEFT JOIN
          ${sql(DB_TABLES.ANSWER_INSTANCES)}
        ON
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.id
          =
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.answer_instance_id

        LEFT JOIN
          ${sql(DB_TABLES.ANSWERS)}
        ON
          ${sql(DB_TABLES.ANSWERS)}.id
          =
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.answer_id

        LEFT JOIN
          ${sql(DB_TABLES.QUESTIONS)}
        ON
          ${sql(DB_TABLES.QUESTIONS)}.id
          =
          ${sql(DB_TABLES.ANSWERS)}.question_id
          AND
          ${sql(DB_TABLES.QUESTIONS)}.index
          =
          ${body.question_index}

        WHERE
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id
          =
          ${body.quiz_attempt_id}
          AND
          ${sql(DB_TABLES.QUESTIONS)}.index
          =
          ${body.question_index}
    `

      const alfaParsed = parseData(array(alfaSchema), alfa)
      const alfaData = alfaParsed
      const isAnyOfPastAnswerAttemptsCorrect = alfaData.find(
        (attempt) => attempt.is_correct
      )

      if (isAnyOfPastAnswerAttemptsCorrect) {
        throw new Error('Have already correct attempt')
      }

      const attemptSoFarCount = alfaData.length

      // GETTING NUMBER OF ALLOWED ATTEMPTS
      const beta = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.allowed_question_attempts

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
          ${body.quiz_attempt_id}
      `

      const betaParsed = parseData(array(betaSchema), beta)
      const betaData = getData(betaParsed)
      const allowedAttempts = betaData?.allowed_question_attempts

      if (attemptSoFarCount >= allowedAttempts) {
        throw new Error('Too many attempts')
      }

      // CHECKING IF THIS ANSWER IS CORRECT
      const ceta = await sql`
        SELECT
          ${sql(DB_TABLES.ANSWERS)}.is_correct AS is_correct,
          ${sql(DB_TABLES.QUESTIONS)}.points AS points

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

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
          =
          ${body.quiz_attempt_id}
            AND
          ${sql(DB_TABLES.QUESTIONS)}.index
          =
          ${body.question_index}
            AND
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.id
          =
          ${body.answer_instance_id}
      `

      const cetaParsed = parseData(array(cetaSchema), ceta)
      const cetaData = getData(cetaParsed)
      const isThisAnswerCorrect = cetaData?.is_correct
      const points = cetaData.points

      const score = getScore(
        attemptSoFarCount,
        allowedAttempts,
        points,
        isThisAnswerCorrect
      )

      await sql`
      INSERT INTO
        ${sql(DB_TABLES.ANSWER_ATTEMPTS)} (
          answer_instance_id,
          quiz_attempt_id,
          score
        )

      VALUES
        (
          ${body.answer_instance_id},
          ${body.quiz_attempt_id},
          ${score}
        )
    `
    })

    res.sendStatus(204)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

// QUIZ ATTEMPT
const quizAttemptSchema = object({
  is_completed: quizAttempt.shape.is_completed,
  is_started: quizAttempt.shape.is_started
})

// ALFA
const alfaSchema = object({
  id: answerAttempt.shape.id,
  is_correct: answer.shape.is_correct
})

// BETA
const betaSchema = object({
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts
})

// CETA
const cetaSchema = object({
  is_correct: answer.shape.is_correct,
  points: question.shape.points
})

export default checkAnswer
