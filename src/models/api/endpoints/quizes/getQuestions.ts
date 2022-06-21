import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { answer, Question, question, quiz } from '../../models'
import { parseData, sendError } from '../../utils'

const getQuestions = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody[]>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const alfa = await sql`
      SELECT
        ${sql(DB_TABLES.QUESTIONS)}.id as question_id,
        ${sql(DB_TABLES.QUESTIONS)}.content as question_content,
        ${sql(DB_TABLES.QUESTIONS)}.points as question_points,
        ${sql(DB_TABLES.QUESTIONS)}.index as question_index,
        ${sql(DB_TABLES.ANSWERS)}.id as answer_id,
        ${sql(DB_TABLES.ANSWERS)}.is_correct as answer_is_correct,
        ${sql(DB_TABLES.ANSWERS)}.value as answer_value,
        ${sql(DB_TABLES.ANSWERS)}.explanation as answer_explanation

      FROM
        ${sql(DB_TABLES.ANSWERS)}

      LEFT JOIN
        ${sql(DB_TABLES.QUESTIONS)}
      ON
        ${sql(DB_TABLES.QUESTIONS)}.id = ${sql(DB_TABLES.ANSWERS)}.question_id

      WHERE
        ${sql(DB_TABLES.QUESTIONS)}.quiz_id = ${queryParams.quiz_id}
  `
    const alfaParsed = parseData(array(alfaSchema), alfa)
    const alfaData = alfaParsed

    const questionsAndAnswers = groupAnswersIntoQuestions(alfaData)
    const questionsAndAnswersParsed = parseData(
      array(responseBodySchema),
      questionsAndAnswers
    )

    res.send(questionsAndAnswersParsed)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const queryParamsSchema = object({
  quiz_id: quiz.shape.id
})
type QueryParams = TypeOf<typeof queryParamsSchema>

const alfaSchema = object({
  question_id: question.shape.id,
  question_content: question.shape.content,
  question_points: question.shape.points,
  question_index: question.shape.index,
  answer_id: answer.shape.id,
  answer_is_correct: answer.shape.is_correct,
  answer_value: answer.shape.value,
  answer_explanation: answer.shape.explanation.optional()
})

type Alfa = TypeOf<typeof alfaSchema>

const betaSchema = object({
  id: question.shape.id,
  content: question.shape.content,
  points: question.shape.points,
  index: question.shape.index
})

type Beta = TypeOf<typeof betaSchema>

const cetaSchema = object({
  id: answer.shape.id,
  value: answer.shape.value,
  is_correct: answer.shape.is_correct,
  explanation: answer.shape.explanation
})

type Ceta = TypeOf<typeof cetaSchema>

const responseBodySchema = betaSchema.extend({
  answers: array(cetaSchema)
})

type ResponseBody = TypeOf<typeof responseBodySchema>

export default getQuestions

const groupAnswersIntoQuestions = (answers: Alfa[]) => {
  const questionsWithAnswers = answers
    .reduce((questionIds: Question['id'][], answer) => {
      const questionId = answer.question_id

      if (!questionIds.includes(questionId)) {
        return [...questionIds, questionId]
      }

      return questionIds
    }, [])
    .map((questionId) => {
      const firstAnswer = answers.find(
        (answer) => answer.question_id === questionId
      )

      if (!firstAnswer) {
        throw new Error('Question has no first answer!')
      }

      const questionData: Beta = {
        id: firstAnswer.question_id,
        points: firstAnswer.question_points,
        content: firstAnswer.question_content,
        index: firstAnswer.question_index
      }

      return {
        ...questionData,
        answers: answers
          .filter((answer) => answer.question_id === questionId)
          .map(
            (answer): Ceta => ({
              id: answer.answer_id,
              value: answer.answer_value,
              is_correct: answer.answer_is_correct,
              explanation: answer.answer_explanation || null
            })
          )
      }
    })
    .sort((prev, next) => prev.index - next.index)

  return questionsWithAnswers
}
