import { boolean, string, TypeOf } from 'zod'
import { roleRelated } from './roleRelated'
import { tableBase } from './tableBase'
import { school } from './school'

export const teacher = tableBase.merge(roleRelated).extend({
  surname: string(),
  school_id: school.shape.id
})

export type Teacher = TypeOf<typeof teacher>
