import { string, TypeOf } from 'zod'
import { group } from './group'
import { roleRelated } from './roleRelated'
import { school } from './school'
import { tableBase } from './tableBase'

export const student = tableBase.merge(roleRelated).extend({
  surname: string(),
  group_id: group.shape.id,
  school_id: school.shape.id
})

export type Student = TypeOf<typeof student>
