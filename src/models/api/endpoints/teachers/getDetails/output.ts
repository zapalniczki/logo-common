import { TypeOf, enum as zenum, array } from 'zod'
import { teacher } from '../../../models'

const permissions = zenum(['DELETE', 'BLOCK', 'UNBLOCK', 'EDIT'])
export type Permissions = TypeOf<typeof permissions>

export const schema = teacher.pick({
  name: true,
  email: true,
  id: true,
  surname: true,
  email_confirmed: true,
  blocked: true
})

export const responseSchema = schema.extend({ permissions: array(permissions) })

export type ResponseBody = TypeOf<typeof responseSchema>
