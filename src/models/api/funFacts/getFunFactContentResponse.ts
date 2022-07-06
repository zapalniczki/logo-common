import { object, string, TypeOf } from 'zod'

export const getFunFactContentResponse = object({
  content: string()
})
export type GetFunFactContentResponse = TypeOf<typeof getFunFactContentResponse>
