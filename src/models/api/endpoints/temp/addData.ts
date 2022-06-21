import { Request, Response } from 'express'
import { array, number, object, string, TypeOf } from 'zod'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { answer, question, questionInstance, quiz } from '../../models'
import { getData, parseData, sendError } from '../../utils'

const addData = async (
  req: Request<undefined, undefined, undefined, QueryParams>,
  res: Response
) => {
  try {
    const queryParams = parseData(queryParamsSchema, req.query)

    const quizIndex = queryParams.quiz_index
    const quizName = `Quiz${quizIndex}`
    const quizIntroduction = `Introduction of ${quizName}`

    const quizQueryResponse = await sql`
      INSERT INTO
        ${sql(DB_TABLES.QUIZES)} (name, category, introduction)
      VALUES
        (${quizName}, 'CATEGORY_1', ${quizIntroduction})
      RETURNING id

    `

    const quizQueryResultParsed = parseData(
      array(quizQuerySchema),
      quizQueryResponse
    )
    const quizQueryResultData = getData(quizQueryResultParsed)
    const quizId = quizQueryResultData.id

    const questionCount = queryParams.question_count
    const answerCount = queryParams.answer_count
    const quizInstanceCount = queryParams.quiz_instance_count
    const teacherId = queryParams.teacher_id

    const questions = [...Array(questionCount).keys()].map(
      async (_question, index) =>
        queryQuestion(index, quizName, quizId, answerCount)
    )

    const originals: Original = {
      id: quizId,
      index: quizIndex,
      questions: await Promise.all(questions)
    }

    ;[...Array(quizInstanceCount).keys()].forEach(async (_question, index) =>
      queryQuizInstance(
        index,
        quizId,
        quizName,
        quizIndex,
        originals.questions,
        teacherId
      )
    )

    res.sendStatus(204)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

const queryQuestion = async (
  index: number,
  quizName: string,
  quizId: string,
  answerCount: number
): Promise<OriginalQuestion> => {
  const questionIndex = index + 1
  const questionContent = `Question${questionIndex} ${quizName}`

  const questionQueryResponse = await sql`
        INSERT INTO
          ${sql(DB_TABLES.QUESTIONS)} (content, quiz_id, index)
        VALUES
          (${questionContent}, ${quizId}, ${questionIndex})
        RETURNING id
      `

  const questionQueryParsed = parseData(
    array(questionQuerySchema),
    questionQueryResponse
  )
  const questionQueryData = getData(questionQueryParsed)
  const questionId = questionQueryData.id

  const answers = [...Array(answerCount).keys()].map(
    async (_answer, index) =>
      await queryAnswer(index, questionContent, questionId)
  )

  return {
    id: questionId,
    index: questionIndex,
    answers: await Promise.all(answers)
  }
}

const queryAnswer = async (
  index: number,
  questionContent: string,
  questionId: string
): Promise<OriginalAnswer> => {
  const answerIndex = index + 1
  const answerContent = `Answer${answerIndex} ${questionContent}`
  const explanationContent = `Explanation${answerIndex} ${questionContent}`
  const isCorrect = answerIndex === 1 ? true : false

  const answerQueryResponse = await sql`
    INSERT INTO
      ${sql(DB_TABLES.ANSWERS)} (question_id, is_correct, value, explanation)
    VALUES
      (${questionId}, ${isCorrect}, ${answerContent}, ${explanationContent})
    RETURNING id
  `

  const answerQueryParsed = parseData(
    array(answerQuerySchema),
    answerQueryResponse
  )
  const answerQueryData = getData(answerQueryParsed)
  const answerId = answerQueryData.id

  return {
    id: answerId,
    index: answerIndex
  }
}

const queryQuizInstance = async (
  index: number,
  quizId: string,
  quizName: string,
  quizIndex: number,
  questions: Array<OriginalQuestion>,
  teacherId: string
) => {
  const quizInstanceIndex = index + 1
  const quizInstanceName = `QuizInstance${quizInstanceIndex} ${quizName}`

  const quizInstanceQueryResponse = await sql`
      INSERT INTO
        ${sql(DB_TABLES.QUIZ_INSTANCES)} (quiz_id, name, teacher_id, index)
      VALUES
        (${quizId}, ${quizInstanceName}, ${teacherId}, ${quizInstanceIndex})
      RETURNING id
    `

  const quizInstanceQueryParsed = parseData(
    array(quizInstanceQuerySchema),
    quizInstanceQueryResponse
  )
  const quizInstanceQueryData = getData(quizInstanceQueryParsed)
  const quizInstanceId = quizInstanceQueryData.id

  questions.forEach(async (question) => {
    const questionContent = `Question${question.index} QuizInstance${quizInstanceIndex} Quiz${quizIndex}`

    queryQuestionInstance(
      quizInstanceIndex,
      quizInstanceId,
      questionContent,
      question
    )
  })
}

const queryQuestionInstance = async (
  index: number,
  quizInstanceId: string,
  questionContent: string,
  question: OriginalQuestion
) => {
  const questionInstanceIndex = index
  const questionInstanceContent = `QuestionInstance${questionInstanceIndex} ${questionContent}`

  const questionInstanceQueryResponse = await sql`
        INSERT INTO
          ${sql(
            DB_TABLES.QUESTION_INSTANCES
          )} (content, quiz_instance_id, question_id)
        VALUES
          (${questionInstanceContent}, ${quizInstanceId}, ${question.id})
        RETURNING id
      `

  const questionInstanceQueryParsed = parseData(
    array(questionInstanceQuerySchema),
    questionInstanceQueryResponse
  )
  const questionInstanceQueryData = getData(questionInstanceQueryParsed)
  const questionInstanceId = questionInstanceQueryData.id

  question.answers.forEach(async (answer) => {
    const answerContent = `Answer${answer.index} ${questionInstanceContent}`

    queryAnswerInstance(
      questionInstanceIndex,
      answerContent,
      answer,
      quizInstanceId
    )
  })
}

const queryAnswerInstance = async (
  index: number,
  answerContent: string,
  answer: OriginalAnswer,
  quizInstanceId: string
) => {
  const answerInstanceIndex = index
  const answerInstanceContent = `AnswerInstance${answerInstanceIndex} ${answerContent}`
  const explanationInstanceContent = `AnswerInstance${answerInstanceIndex} ${answerContent}`

  const answerInstanceQueryResponse = await sql`
    INSERT INTO
      ${sql(
        DB_TABLES.ANSWER_INSTANCES
      )} (value, answer_id, quiz_instance_id, explanation)
    VALUES
      (${answerInstanceContent}, ${
    answer.id
  }, ${quizInstanceId}, ${explanationInstanceContent})
    RETURNING id
  `

  parseData(array(answerInstanceQuerySchema), answerInstanceQueryResponse)
}

// QUERY PARAMS
const queryParamsSchema = object({
  quiz_index: number(),
  question_count: number(),
  answer_count: number(),
  quiz_instance_count: number(),
  teacher_id: string()
})

type QueryParams = TypeOf<typeof queryParamsSchema>

// QUiZ QUERY
const quizQuerySchema = quiz.pick({ id: true })

// QUESTION QUERY
const questionQuerySchema = question.pick({ id: true })

// ANSWERS QUERY
const answerQuerySchema = answer.pick({ id: true })

// QUIZ INSTANCE QUERY
const quizInstanceQuerySchema = quiz.pick({ id: true })

// QUESTION INSTANCE QUERY
const questionInstanceQuerySchema = questionInstance.pick({ id: true })

// ANSWER INSTANCE QUERY
const answerInstanceQuerySchema = questionInstance.pick({ id: true })

// OTHER
type Original = {
  id: string
  index: number
  questions: Array<OriginalQuestion>
}

type OriginalQuestion = {
  id: string
  index: number
  answers: Array<OriginalAnswer>
}

type OriginalAnswer = {
  id: string
  index: number
}

export default addData
