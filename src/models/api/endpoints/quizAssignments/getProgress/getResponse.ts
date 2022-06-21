import { isBefore } from 'date-fns'
import { groupBy } from 'lodash'
import { AttemptsResponse, ResponseBodyItem } from './output'

const getResponse = (attemptsData: AttemptsResponse[]) => {
  const attemptsGroupedByStudentId = groupBy(attemptsData, 'id')
  const studentIds = Object.keys(attemptsGroupedByStudentId)

  const progress = studentIds.map((studentId): ResponseBodyItem => {
    const attempts = attemptsData.filter((attempt) => attempt.id === studentId)
    const student = attemptsData.find((attempt) => attempt.id === studentId)

    if (!student) {
      throw new Error('Error')
    }

    return {
      id: studentId,
      name: student.name,
      surname: student.surname,
      attempts: attempts
        .filter((attempt) => attempt.completed_at)
        .map((attempt) => {
          if (!attempt.completed_at) {
            throw new Error('Error')
          }

          return {
            score_percentage: attempt.score_percentage,
            completed_at: attempt.completed_at
          }
        })
        .sort((prev, next) =>
          isBefore(prev.completed_at, next.completed_at) ? -1 : 1
        )
    }
  })

  return progress
}

export default getResponse
