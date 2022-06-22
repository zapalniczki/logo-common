import { enum as zenum, object, TypeOf } from 'zod'
import { getQueryParams, getSortingQuery } from '../../../../helpers'
import { school } from '../../../db'

const sortingKeys = zenum(['SURNAME', 'EMAIL', 'EMAIL_CONFIRMED', 'CREATED_AT'])
const sortingQuery = getSortingQuery(sortingKeys)
type SortingQuery = TypeOf<typeof sortingQuery>

export const querySchema = object({
  school_id: school.shape.id
})

export const getAllTeachersRequest = getQueryParams(querySchema, sortingKeys)
export type GetAllTeachersRequest = TypeOf<typeof getAllTeachersRequest>
