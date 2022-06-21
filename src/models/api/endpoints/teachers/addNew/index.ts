import { Request, Response } from 'express'
import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { inviteUserByEmail, parseData, sendError } from '../../../utils'
import { RequestBody, requestBody as requestBodySchema } from './input'

const addNew = async (
  req: Request<undefined, undefined, undefined, RequestBody>,
  res: Response
) => {
  try {
    const requestBody = parseData(requestBodySchema, req.body)

    const addUserPayload = {
      ...requestBody,
      email_confirmed: false,
      role: 'TEACHER' as const
    }

    const invitationData = await inviteUserByEmail(addUserPayload)
    if (invitationData.error) {
      sendError(res, invitationData.error.message)
      return
    }

    const userId = invitationData.data?.id
    if (!userId) {
      sendError(res, 'No userId')
      return
    }

    const addProfilePayload = {
      ...requestBody,
      email_confirmed: false,
      id: userId
    }

    await sql`
        INSERT INTO
          ${sql(DB_TABLES.TEACHERS)}

          ${sql(
            addProfilePayload,
            'id',
            'name',
            'surname',
            'email',
            'email_confirmed',
            'school_id'
          )}
    `

    res.sendStatus(204)
  } catch (error: any) {
    sendError(res, error.message)
  }
}

export default addNew
