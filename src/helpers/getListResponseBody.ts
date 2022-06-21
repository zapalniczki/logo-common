import { array, object, ZodObject, ZodRawShape } from 'zod'
import { pagination } from 'models'

function getListResponseBody<T extends ZodRawShape>(schema: ZodObject<T>) {
  const responseBody = object({
    pagination,
    list: array(schema)
  })

  return responseBody
}

export default getListResponseBody
