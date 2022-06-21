import { Request, Response } from 'express'
import { sql } from '../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { sendError } from '../../utils'

const removeAll = async (_req: Request, res: Response) => {
  try {
    await sql`DELETE FROM ${sql(DB_TABLES.ANSWER_ATTEMPTS)}`
    await sql`DELETE FROM ${sql(DB_TABLES.QUIZ_ATTEMPTS)}`

    await sql`DELETE FROM ${sql(DB_TABLES.ANSWER_INSTANCES)}`
    await sql`DELETE FROM ${sql(DB_TABLES.ANSWERS)}`

    await sql`DELETE FROM ${sql(DB_TABLES.QUESTION_INSTANCES)}`
    await sql`DELETE FROM ${sql(DB_TABLES.QUESTIONS)}`

    await sql`DELETE FROM ${sql(DB_TABLES.QUIZ_INSTANCES)}`
    await sql`DELETE FROM ${sql(DB_TABLES.QUIZES)}`

    res.sendStatus(204)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default removeAll
