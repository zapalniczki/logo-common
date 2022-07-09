import { ZodObject, ZodRawShape } from 'zod'
import { userSchema } from '../models'

function getUserSchema<T extends ZodRawShape>(schema: ZodObject<T>) {
  const responseSchema = userSchema.merge(schema)

  return responseSchema
}

export default getUserSchema
