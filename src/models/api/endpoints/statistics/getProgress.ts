import { addDays, format, subDays } from 'date-fns'
import { Request, Response } from 'express'
import { groupBy, sortBy } from 'lodash'
import { array, number, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import {
  answerAttempt,
  question,
  quizAssignment,
  quizAttempt,
  QuizAttemptResult,
  quizAttemptResult,
  student,
  teacher
} from '../../models'
import {
  checkIfTeacher,
  getLimitQuery,
  parseData,
  sendError,
  validateSingleUserOLD
} from '../../utils'

const getProgress = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody[]>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const teacherId = queryParams.teacher_id
    const limit = queryParams.limit

    const hasSingleUser = validateSingleUserOLD(teacherId)
    if (!hasSingleUser) {
      sendError(res, 'There should be given exactly 1 user')
      return
    }

    const today = new Date()
    const endDate = addDays(today, 1)
    const startDate = subDays(endDate, 7)

    const endDateFormatted = format(endDate, POSTGRESS_DATE_FORMAT)
    const startDateFormatted = format(startDate, POSTGRESS_DATE_FORMAT)

    const limitQuery = getLimitQuery(limit)

    if (teacherId) {
      const isTeacher = await checkIfTeacher(teacherId)
      if (!isTeacher) {
        return
      }

      // GETTING ALL QUIZ_ATTEMPTS BETWEEN DATES AND BELOGING TO TEACHER STUDENTS
      const alfa = await sql`
        SELECT
          ${sql(DB_TABLES.STUDENTS)}.id as student_id,
          ${sql(DB_TABLES.STUDENTS)}.name as student_name,
          ${sql(DB_TABLES.STUDENTS)}.surname as student_surname,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id as quiz_attempt_id,
          (
            SELECT
              CAST(SUM(${sql(DB_TABLES.QUESTIONS)}.points) AS FLOAT4)

            FROM
              ${sql(DB_TABLES.QUESTIONS)}

            WHERE
              ${sql(DB_TABLES.QUESTIONS)}.quiz_id = ${sql(
        DB_TABLES.QUIZ_ATTEMPTS
      )}.quiz_id
          ) as points,
          ${sql(
            DB_TABLES.QUIZ_ATTEMPTS
          )}.is_completed as quiz_attempt_is_completed,
          (CASE
            WHEN SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score) IS NULL
            THEN 0

            ELSE SUM(${sql(DB_TABLES.ANSWER_ATTEMPTS)}.score)
          END) as score,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.pass_threshold as pass_threshold,
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at as completed_at

        FROM
          ${sql(DB_TABLES.STUDENTS)}

        LEFT JOIN
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}
        ON
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.student_id = ${sql(
        DB_TABLES.STUDENTS
      )}.id

        LEFT JOIN
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}
        ON
          ${sql(DB_TABLES.ANSWER_ATTEMPTS)}.quiz_attempt_id = ${sql(
        DB_TABLES.QUIZ_ATTEMPTS
      )}.id

        WHERE
          ${sql(DB_TABLES.STUDENTS)}.teacher_id = ${teacherId}
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id IS NOT NULL
          AND
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.is_completed = TRUE
          AND
          ${sql(
            DB_TABLES.QUIZ_ATTEMPTS
          )}.completed_at BETWEEN ${startDateFormatted} AND ${endDateFormatted}

        GROUP BY
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.id,
          ${sql(DB_TABLES.STUDENTS)}.id

        ORDER BY
          ${sql(DB_TABLES.QUIZ_ATTEMPTS)}.completed_at ASC

        ${limitQuery}
      `

      const alfaParsed = parseData(array(alfaSchema), alfa)

      const response = getResponseBody(alfaParsed)
      const responseParsed = parseData(array(responseBodySchema), response)
      res.send(responseParsed)
    }
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const queryParamsSchema = object({
  teacher_id: teacher.shape.id,
  limit: number().optional()
})

type QueryParams = TypeOf<typeof queryParamsSchema>

const alfaSchema = object({
  student_id: student.shape.id,
  student_name: student.shape.name,
  student_surname: student.shape.surname,
  quiz_attempt_id: quizAttempt.shape.id,
  points: question.shape.points,
  score: answerAttempt.shape.score,
  pass_threshold: quizAssignment.shape.pass_threshold,
  completed_at: quizAttempt.shape.completed_at
})
type Alfa = TypeOf<typeof alfaSchema>

const responseBodySchema = object({
  id: student.shape.id,
  name: student.shape.name,
  surname: student.shape.surname,
  quiz_attempts: array(
    object({
      id: alfaSchema.shape.quiz_attempt_id,
      points: alfaSchema.shape.points,
      score: alfaSchema.shape.score,
      pass_threshold: alfaSchema.shape.pass_threshold,
      completed_at: alfaSchema.shape.completed_at,
      percentage_score: number(),
      result: quizAttemptResult
    })
  )
})
type ResponseBody = TypeOf<typeof responseBodySchema>

const POSTGRESS_DATE_FORMAT = `yyyy/MM/dd`

const getResponseBody = (alfa: Alfa[]): ResponseBody[] => {
  const alfaByStudentId = groupBy(alfa, 'student_id')
  const studentIdEntries = Object.entries(alfaByStudentId)

  const response = studentIdEntries.map(([studentId, quizAttempts]) => {
    const quizAttemptsShaped = quizAttempts.map((quizAttempt) => {
      const percentageScore = (quizAttempt.score / quizAttempt.points) * 100

      let result: QuizAttemptResult
      if (quizAttempt.pass_threshold) {
        if (percentageScore >= quizAttempt.pass_threshold) {
          result = 'PASS' as QuizAttemptResult
        } else {
          result = 'FAIL' as QuizAttemptResult
        }
      } else {
        result = 'NEUTRAL'
      }

      return {
        id: quizAttempt.quiz_attempt_id,
        points: quizAttempt.points,
        score: quizAttempt.score,
        pass_threshold: quizAttempt.pass_threshold,
        completed_at: quizAttempt.completed_at,
        percentage_score: percentageScore,
        result: result as QuizAttemptResult
      }
    })
    const quizAttemptsSorted = sortBy(quizAttemptsShaped, 'completed_at')

    return {
      id: studentId,
      name: quizAttempts[0].student_name,
      surname: quizAttempts[0].student_surname,
      quiz_attempts: quizAttemptsSorted
    }
  })

  const responseSorted = sortBy(response, ['surname', 'name'])

  return responseSorted
}

export default getProgress
