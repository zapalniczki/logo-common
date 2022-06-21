import { object, string, TypeOf } from 'zod'
import { quizAssignment } from '../../../db'

export const addNewQuizAssignmentRequest = object({
  teacher_id: quizAssignment.shape.teacher_id,
  quiz_id: quizAssignment.shape.quiz_id,
  quiz_instance_id: quizAssignment.shape.id.optional(),
  allowed_question_attempts: quizAssignment.shape.allowed_question_attempts,
  pass_threshold: quizAssignment.shape.pass_threshold,
  name: quizAssignment.shape.name,
  group_id: quizAssignment.shape.group_id,
  should_randomize_quiz_instance_id:
    quizAssignment.shape.should_randomize_quiz_instance_id,
  mode: quizAssignment.shape.mode,
  allowed_quiz_attempts: quizAssignment.shape.allowed_quiz_attempts,
  attempt_time: quizAssignment.shape.attempt_time,
  due_date: string()
})

export type AddNewQuizAssignmentRequest = TypeOf<
  typeof addNewQuizAssignmentRequest
>
