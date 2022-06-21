import { number, object, string, TypeOf } from 'zod'

export const addTempDataRequest = object({
  quiz_index: number(),
  question_count: number(),
  answer_count: number(),
  quiz_instance_count: number(),
  teacher_id: string()
})

export type AddTempDataRequest = TypeOf<typeof addTempDataRequest>
