import { sql } from '../../../config'
import { QuizInstance, Teacher } from '../../../models'
import { RequestBody } from './input'

const getValuesQuery = (
  requestBody: RequestBody,
  teacherId: Teacher['id'],
  hasBeenQuizInstanceIdRandomlySelected: boolean,
  finalQuizInstanceId?: QuizInstance['id']
) => {
  const newQuizAssignmentBasic = {
    quiz_id: requestBody.quiz_id,
    group_id: requestBody.group_id,
    allowed_question_attempts: requestBody.allowed_question_attempts,
    pass_threshold: requestBody.pass_threshold,
    name: requestBody.name,
    teacher_id: teacherId,
    should_randomize_quiz_instance_id:
      requestBody.should_randomize_quiz_instance_id,
    has_been_quiz_instance_id_randomly_selected:
      hasBeenQuizInstanceIdRandomlySelected,
    mode: requestBody.mode,
    allowed_quiz_attempts: requestBody.allowed_quiz_attempts,
    attempt_time: requestBody.attempt_time,
    due_date: requestBody.due_date
  }

  if (finalQuizInstanceId) {
    const values = {
      ...newQuizAssignmentBasic,
      quiz_instance_id: finalQuizInstanceId
    }

    return sql(
      values,
      'allowed_question_attempts',
      'allowed_quiz_attempts',
      'attempt_time',
      'group_id',
      'has_been_quiz_instance_id_randomly_selected',
      'mode',
      'name',
      'pass_threshold',
      'quiz_id',
      'quiz_instance_id',
      'should_randomize_quiz_instance_id',
      'teacher_id',
      'due_date'
    )
  }
  const values = {
    ...newQuizAssignmentBasic
  }

  return sql(
    values,
    'allowed_question_attempts',
    'allowed_quiz_attempts',
    'attempt_time',
    'group_id',
    'has_been_quiz_instance_id_randomly_selected',
    'mode',
    'name',
    'pass_threshold',
    'quiz_id',
    'should_randomize_quiz_instance_id',
    'teacher_id',
    'due_date'
  )
}

export default getValuesQuery
