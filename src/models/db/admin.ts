import { string, TypeOf } from 'zod'
import { roleRelated } from './roleRelated'
import { tableBase } from './tableBase'

export const admin = tableBase.merge(roleRelated).extend({
  surname: string()
})

export type Admin = TypeOf<typeof admin>
