import { sql } from '../../../config'
import { DB_TABLES, ENDPOINTS } from '@zapalniczki/logo-common'
import { QueryParams } from './input'

const getFiltersQuery = (query: QueryParams) => {
  if (query.level) {
    return sql`
      WHERE
        ${sql(DB_TABLES.QUIZES)}.level = ${query.level}
    `
  }

  return sql`
  `
}

export default getFiltersQuery
