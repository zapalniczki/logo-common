import { array, object, ZodEnum, ZodObject, ZodRawShape } from 'zod'
import { filterValue } from '../models'

function getFiltersSchema<
  U extends ZodRawShape,
  T extends ZodEnum<[string, ...string[]]>
>(schema: ZodObject<U>, filters: T) {
  const singleFilter = object({
    key: filters,
    options: array(filterValue)
  })

  const filtersSchema = schema.extend({ filters: array(singleFilter) })

  return filtersSchema
}

export default getFiltersSchema
