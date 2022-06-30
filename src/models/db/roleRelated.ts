import { boolean, object, string, TypeOf } from 'zod'

export const roleRelated = object({
  email_confirmed: boolean(),
  name: string(),
  email: string().email(),
  blocked: boolean()
})

export type RoleRelated = TypeOf<typeof roleRelated>
