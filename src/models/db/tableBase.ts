import { string, TypeOf } from 'zod'
import { timestamps } from './timestamps'

export const tableBase = timestamps.extend({
  id: string().uuid()
})

export type TableBase = TypeOf<typeof tableBase>
