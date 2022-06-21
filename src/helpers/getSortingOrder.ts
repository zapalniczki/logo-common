import { sql } from 'config'
import { SortingOrder } from 'models'

const getSortingOrder = (sortingOrder: SortingOrder) => {
  if (sortingOrder === 'ASC') {
    return sql`ASC`
  } else if (sortingOrder === 'DESC') {
    return sql`DESC`
  }

  return sql``
}

export default getSortingOrder
