import { isBefore } from 'date-fns'
import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { getData, parseData, sendError } from '../../../utils'
import { queryParams, QueryParams } from './input'
import {
  alfaSchema,
  betaSchema,
  cetaSchema,
  deltaSchema,
  echoSchema,
  ResponseBody,
  responseBody
} from './output'

const getReview = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody>
) => {
  try {
    const query = parseData(queryParams, req.query)

    // GETING QUESTIONS WITH SCORES
    const questionsWithScoresQuery = await sql`
      SELECT
        ${sql(DB_TABLES.QUESTIONS)}.index AS index,

        (CASE
          WHEN CAST(COUNT(${sql(
            DB_TABLES.ANSWER_ATTEMPTS
          )}.score) AS SMALLINT) = 0

          THEN TRUE

          ELSE FALSE
        END) AS no_attempts,

        CAST(
          COUNT(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
        AS SMALLINT) AS attempt_count,

        CAST(
          MIN(${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.allowed_question_attempts)
        AS SMALLINT) AS allowed_question_attempts,

        (CASE
          WHEN CAST(
            SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
          AS FLOAT4) IS NOT NULL

          THEN CAST(
            SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
          AS FLOAT4)

          ELSE 0
        END) AS score,

        ${sql(DB_TABLES.QUESTION_INSTANCES)}.content AS content,
        ${sql(DB_TABLES.QUESTIONS)}.points AS points,
        ${sql(DB_TABLES.QUESTION_INSTANCES)}.id AS id

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
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id = ${query.quiz_attempt_id}
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

    const alfaParsed = parseData(array(alfaSchema), questionsWithScoresQuery)
    const alfaData = alfaParsed

    // GETTING BASIC QUIZ ATTEMPT DETAILS
    const beta = await sql`
      SELECT
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.started_at AS started_at,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at AS completed_at,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed AS is_completed,
        ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.pass_threshold AS pass_threshold,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.display_name AS display_name,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.index AS index

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

    const betaParsed = parseData(array(betaSchema), beta)
    const betaData = getData(betaParsed)

    if (!betaData.is_completed) {
      throw new Error('Quiz attempt has not been completed')
    }

    // TEMP Gets all answer instance for question instance for quiz attempt including answer attempts but there is a problem that for each of answer instances there is answer attempt if exists and there should be one per question instance
    const ceta = await sql`
      SELECT
        DISTINCT ON(
          ${sql(DB_TABLES.QUESTION_INSTANCES)}.id,
          ${sql(DB_TABLES.ANSWER_INSTANCES)}.id
        )

        ${sql(DB_TABLES.ANSWER_INSTANCES)}.id AS answer_instance_id,
        ${sql(DB_TABLES.QUESTION_INSTANCES)}.id AS question_instance_id,
        ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.id AS answer_attempt_id,
        ${sql(DB_TABLES.ANSWER_INSTANCES)}.explanation AS explanation,
        ${sql(DB_TABLES.ANSWERS)}.is_correct AS is_correct,
        ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score AS score,
        ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.created_at AS created_at,
        ${sql(DB_TABLES.ANSWER_INSTANCES)}.id AS id,
        ${sql(DB_TABLES.ANSWER_INSTANCES)}.value AS value,
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id AS quiz_attempt_id2,
        ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id AS quiz_attempt_id3

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
        =${query.quiz_attempt_id}

      WHERE
        ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id
        =
        ${query.quiz_attempt_id}
          AND
        ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id
        =
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.id
          AND
        ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id
        =${sql(DB_TABLES.QUIZ_INSTANCES)}.id

      ORDER BY
        ${sql(DB_TABLES.QUESTION_INSTANCES)}.id
      `

    const cetaParsed = parseData(array(cetaSchema), ceta)
    const cetaData = cetaParsed

    const questionsWithAnswers = matchQuestionInstancesWithAnswerAttempts(
      alfaData,
      cetaData
    )

    const response = {
      ...betaData,
      questions: questionsWithAnswers
    }
    const responseParsed = parseData(responseBody, response)
    const responseData = responseParsed

    res.send(responseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

type Alfa = TypeOf<typeof alfaSchema>
type Ceta = TypeOf<typeof cetaSchema>
type Delta = TypeOf<typeof deltaSchema>
type Echo = TypeOf<typeof echoSchema>

const matchQuestionInstancesWithAnswerAttempts = (
  questionInstances: Alfa[],
  answerAttempts: Ceta[]
): Echo[] => {
  const questionInstancesWithAnswerAttempts = questionInstances.map(
    (questionInstance): Echo => {
      const answerInstances = answerAttempts
        .filter(
          (answerAttempt) =>
            answerAttempt.question_instance_id === questionInstance.id
        )
        .sort((prev, next) => {
          if (!prev.created_at) {
            if (!next.created_at) {
              return 0
            } else {
              return 1
            }
          }

          if (!next.created_at) {
            if (!prev.created_at) {
              return 0
            } else {
              return -1
            }
          }

          return isBefore(prev.created_at, next.created_at) ? 1 : -1
        })
        .map((answerAttempt, index): Delta => {
          const isLastAnswerAttempt = !index

          if (isLastAnswerAttempt) {
            return answerAttempt
          }

          return {
            ...answerAttempt,
            is_correct: null,
            score: null,
            created_at: null
          }
        })

      return {
        ...questionInstance,
        answers: answerInstances
      }
    }
  )

  return questionInstancesWithAnswerAttempts
}

export default getReview
