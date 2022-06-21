import { Request, Response } from 'express'
import { array, object, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import {
  answer,
  answerInstance,
  question,
  QuestionInstance,
  questionInstance,
  quizInstance
} from '../../models'
import { parseData, sendError } from '../../utils'

const getInstance = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response<ResponseBody[]>
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const alfa = await sql`
      SELECT
        ${sql(DB_TABLES.QUESTION_INSTANCES)}.id as question_instance_id,
        ${sql(
          DB_TABLES.QUESTION_INSTANCES
        )}.content as question_instance_content,
        ${sql(DB_TABLES.QUESTIONS)}.points as question_points,
        ${sql(DB_TABLES.QUESTIONS)}.index as question_index,

        ${sql(DB_TABLES.ANSWER_INSTANCES)}.id as answer_instance_id,
        ${sql(DB_TABLES.ANSWER_INSTANCES)}.value as answer_instance_value,
        ${sql(
          DB_TABLES.ANSWER_INSTANCES
        )}.explanation as answer_instance_explanation,
        ${sql(DB_TABLES.ANSWERS)}.is_correct as answer_is_correct

      FROM
        ${sql(DB_TABLES.QUIZ_INSTANCES)}

      LEFT JOIN
        ${sql(DB_TABLES.QUESTIONS)}
      ON
        ${sql(DB_TABLES.QUESTIONS)}.quiz_id = ${sql(
      DB_TABLES.QUIZ_INSTANCES
    )}.quiz_id

      LEFT JOIN
        ${sql(DB_TABLES.QUESTION_INSTANCES)}
      ON
        ${sql(DB_TABLES.QUESTION_INSTANCES)}.question_id = ${sql(
      DB_TABLES.QUESTIONS
    )}.id

      LEFT JOIN
        ${sql(DB_TABLES.ANSWERS)}
      ON
        ${sql(DB_TABLES.ANSWERS)}.question_id = ${sql(DB_TABLES.QUESTIONS)}.id

      LEFT JOIN
        ${sql(DB_TABLES.ANSWER_INSTANCES)}
      ON
        ${sql(DB_TABLES.ANSWER_INSTANCES)}.answer_id = ${sql(
      DB_TABLES.ANSWERS
    )}.id


      WHERE
        ${sql(DB_TABLES.QUIZ_INSTANCES)}.id = ${
      queryParams.quiz_instance_id
    } AND ${sql(DB_TABLES.QUESTION_INSTANCES)}.quiz_instance_id = ${
      queryParams.quiz_instance_id
    } AND ${sql(DB_TABLES.ANSWER_INSTANCES)}.quiz_instance_id = ${
      queryParams.quiz_instance_id
    }
    `

    const alfaParsed = parseData(array(alfaSchema), alfa)
    const alfaData = alfaParsed

    const questionInstancesWithAnswerInstances =
      groupAnswerInstancesIntoQuestionInstances(alfaData)

    const questionInstancesWithAnswerInstancesParsed = parseData(
      array(responseBodySchema),
      questionInstancesWithAnswerInstances
    )

    res.send(questionInstancesWithAnswerInstancesParsed)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const queryParamsSchema = object({
  quiz_instance_id: quizInstance.shape.id
})
type QueryParams = TypeOf<typeof queryParamsSchema>

const alfaSchema = object({
  question_instance_id: questionInstance.shape.id,
  question_instance_content: questionInstance.shape.content,
  question_points: question.shape.points,
  question_index: question.shape.index,
  answer_instance_id: answerInstance.shape.id,
  answer_instance_value: answerInstance.shape.value,
  answer_instance_explanation: answerInstance.shape.explanation,
  answer_is_correct: answer.shape.is_correct
})

type Alfa = TypeOf<typeof alfaSchema>

const beta = object({
  id: questionInstance.shape.id,
  content: questionInstance.shape.content,
  points: question.shape.points,
  index: question.shape.index
})

type Beta = TypeOf<typeof beta>

const ceta = object({
  id: answerInstance.shape.id,
  value: answerInstance.shape.value,
  is_correct: answer.shape.is_correct,
  explanation: answerInstance.shape.explanation
})

type Ceta = TypeOf<typeof ceta>

const responseBodySchema = beta.extend({
  answers: array(ceta)
})

type ResponseBody = TypeOf<typeof responseBodySchema>

const groupAnswerInstancesIntoQuestionInstances = (answerInstances: Alfa[]) => {
  const questionsWithAnswers = answerInstances
    .reduce((questionInstanceIds: QuestionInstance['id'][], answerInstance) => {
      const questionInstanceId = answerInstance.question_instance_id

      if (!questionInstanceIds.includes(questionInstanceId)) {
        return [...questionInstanceIds, questionInstanceId]
      }

      return questionInstanceIds
    }, [])
    .map((questionId) => {
      const firstAnswerInstance = answerInstances.find(
        (answer) => answer.question_instance_id === questionId
      )

      if (!firstAnswerInstance) {
        throw new Error('Question instance has no first answer instance!')
      }

      const questionInstanceData: Beta = {
        id: firstAnswerInstance.question_instance_id,
        points: firstAnswerInstance.question_points,
        content: firstAnswerInstance.question_instance_content,
        index: firstAnswerInstance.question_index
      }

      return {
        ...questionInstanceData,
        answers: answerInstances
          .filter(
            (answerInstance) =>
              answerInstance.question_instance_id === questionId
          )
          .map(
            (answerInstance): Ceta => ({
              id: answerInstance.answer_instance_id,
              value: answerInstance.answer_instance_value,
              is_correct: answerInstance.answer_is_correct,
              explanation: answerInstance.answer_instance_explanation || null
            })
          )
      }
    })
    .sort((prev, next) => prev.index - next.index)

  return questionsWithAnswers
}

export default getInstance
