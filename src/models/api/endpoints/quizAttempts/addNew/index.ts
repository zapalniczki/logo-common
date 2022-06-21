import { Request, Response } from 'express'
import { array, object } from 'zod'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { quizAssignment, quizInstance } from '../../../models'
import { getCount, getData, parseData, sendError } from '../../../utils'
import { requestBody, RequestBody } from './input'
import { responseBody, ResponseBody } from './output'

const addNew = async (
  req: Request<undefined, undefined, RequestBody>,
  res: Response<ResponseBody>
) => {
  try {
    const body = parseData(requestBody, req.body)

    const responseData = await sql.begin(async (sql) => {
      // CHECKING ALL QUIZ ATTEMPTS COUNT
      const quizAttemptCountQuery = await sql`
        SELECT
          COUNT(*)

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.student_id
          =
          ${body.student_id}
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id
          =
          ${body.quiz_assignment_id}
      `

      const quizAttemptCount = getCount(quizAttemptCountQuery)
      //

      // CHECKING IF QUIZ ASSIGNMENT HAS QUIZ_INSTANCE_ID
      const quizAssignmentQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_instance_id
          AS
          quiz_instance_id,
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.allowed_quiz_attempts
          AS
          allowed_quiz_attempts


        FROM
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id = ${body.quiz_assignment_id}
      `

      const quizAssignmentParsed = parseData(
        array(quizAssignmentSchema).nonempty(),
        quizAssignmentQuery
      )
      const quizAssignmentData = getData(quizAssignmentParsed)
      const quizInstanceId = quizAssignmentData.quiz_instance_id
      const allowedQuizAttempts = quizAssignmentData.allowed_quiz_attempts

      if (allowedQuizAttempts && quizAttemptCount >= allowedQuizAttempts) {
        throw new Error('Max attempt count has been reached')
      }
      //

      // CHECKING IF USER HAS LESS THAN 5 UNCOMPLETED QUIZ ATTEMPTS
      const attemptsCompletedSoFarQuery = await sql`
        SELECT
          COUNT(*)

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.student_id
          =
          ${body.student_id}
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id
          =
          ${body.quiz_assignment_id}
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed
          =
          FALSE
      `

      const notCompletedAttemptCount = getCount(attemptsCompletedSoFarQuery)

      if (notCompletedAttemptCount >= 5) {
        throw new Error('This are 5 or more open quiz attempts')
      }
      //

      // GETTING INDEX OF THIS QUIZ ATTEMPT
      const attemptIndexQuery = await sql`
        SELECT
          COUNT(*)

        FROM
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

        WHERE
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.student_id
          =
          ${body.student_id}
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.quiz_assignment_id
          =
          ${body.quiz_assignment_id}
      `

      const attemptIndex = getCount(attemptIndexQuery)
      //

      // GETTING RANDOM QUIZ INSTANCE ID
      let quizAttemptQuizInstanceId = quizInstanceId
      if (!quizInstanceId) {
        const randomQuizInstanceQuery = await sql`
        SELECT
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.id AS quiz_instance_id

        FROM
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}

        LEFT JOIN
          ${sql(DB_TABLES.STUDENTS)}
        ON
          ${sql(DB_TABLES.STUDENTS)}.id = ${body.student_id}

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
          ${sql(DB_TABLES.QUIZ_INSTANCES)}
        ON
          ${sql(DB_TABLES.QUIZ_INSTANCES)}.school_id
          =
          ${sql(DB_TABLES.COHORTS)}.school_id

          AND

          ${sql(DB_TABLES.QUIZ_INSTANCES)}.quiz_id
          =
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.quiz_id

        WHERE
          ${sql(DB_TABLES.QUIZ_ASSIGNMENTS)}.id = ${body.quiz_assignment_id}

        ORDER BY
          RANDOM()

        LIMIT
          1
        `
        const randomQuizInstanceParsed = parseData(
          array(randomQuizInstanceSchema).nonempty(),
          randomQuizInstanceQuery
        )

        const randomQuizInstanceData = getData(randomQuizInstanceParsed)
        quizAttemptQuizInstanceId = randomQuizInstanceData.quiz_instance_id
      }
      //

      const newQuizAttempt = {
        quiz_instance_id: quizAttemptQuizInstanceId,
        quiz_assignment_id: body.quiz_assignment_id,
        student_id: body.student_id,
        index: attemptIndex + 1
      }

      const responseQuery = await sql`
        INSERT INTO
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}

          ${sql(
            newQuizAttempt,
            'quiz_instance_id',
            'quiz_assignment_id',
            'student_id',
            'index'
          )}

        RETURNING
          id AS quiz_attempt_id
      `

      const responseQueryParsed = parseData(
        array(responseBody).length(1),
        responseQuery
      )
      const responseData = getData(responseQueryParsed)

      return responseData
    })

    res.send(responseData)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const randomQuizInstanceSchema = object({
  quiz_instance_id: quizInstance.shape.id
})

const quizAssignmentSchema = object({
  quiz_instance_id: quizAssignment.shape.quiz_instance_id,
  allowed_quiz_attempts: quizAssignment.shape.allowed_quiz_attempts
})

export default addNew
