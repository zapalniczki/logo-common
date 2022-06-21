import divide from 'lodash.divide'
import multiply from 'lodash.multiply'
import { QuizAttemptsWithScore, ResponseBody } from './output'

const getResponse = (
  quizAttempts: QuizAttemptsWithScore[]
): ResponseBody['list'] =>
  quizAttempts.map((quizAttempt) => ({
    ...quizAttempt,
    result: getResult(
      quizAttempt.score,
      quizAttempt.points,
      quizAttempt.pass_threshold
    )
  }))

const getResult = (
  score: number,
  points: number,
  passThreshold: number | null
) => {
  const result = multiply(divide(score, points), 100)

  if (passThreshold) {
    if (result >= passThreshold) {
      return 'PASS'
    }

    if (result < passThreshold) {
      return 'FAIL'
    }
  }

  return 'NEUTRAL'
}

export default getResponse
