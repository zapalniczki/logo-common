import { boolean, TypeOf } from 'zod'
import { admin } from './admin'
import { roleRelated } from './roleRelated'
import { tableBase } from './tableBase'

export const school = tableBase.merge(roleRelated).extend({
  admin_id: admin.shape.id,
  blocked: boolean()
})

export type School = TypeOf<typeof school>
