import { add, round } from 'lodash'
import divide from 'lodash.divide'
import multiply from 'lodash.multiply'
import subtract from 'lodash.subtract'

const getScore = (
  attemptSoFarCount: number,
  allowedAttemptCount: number,
  points: number,
  isCorrect: boolean
): number => {
  const attemptScore = divide(points, allowedAttemptCount)
  const score = multiply(
    subtract(allowedAttemptCount, add(attemptSoFarCount, 0)),
    attemptScore
  )

  const scoreRounded = round(score, 2)

  if (isCorrect) {
    return scoreRounded
  }

  return 0
}

export default getScore
