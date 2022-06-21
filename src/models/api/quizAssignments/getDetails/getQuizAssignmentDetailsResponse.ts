import { object, string, TypeOf } from 'zod'
import { quiz, quizAssignment, quizInstance } from '../../../db'

export const getQuizAssignmentDetailsResponse = object({
  id: quizAssignment.shape.id,
  name: quizAssignment.shape.name,
  created_at: quizAssignment.shape.created_at,
  category: quiz.shape.category,
  mode: quizAssignment.shape.mode,
  pass_threshold: quizAssignment.shape.pass_threshold,
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts,
  allowed_quiz_attempts: quizAssignment.shape.allowed_quiz_attempts,
  group_name: string(),
  teacher_name: string(),
  quiz_name: quiz.shape.name,
  quiz_instance_name: quizInstance.shape.name.nullable(),
  has_been_quiz_instance_id_randomly_selected:
    quizAssignment.shape.has_been_quiz_instance_id_randomly_selected,
  attempt_time: quizAssignment.shape.attempt_time,
  due_date: quizAssignment.shape.due_date
})

export type GetQuizAssignmentDetailsResponse = TypeOf<
  typeof getQuizAssignmentDetailsResponse
>
