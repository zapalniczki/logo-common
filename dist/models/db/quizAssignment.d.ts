import { TypeOf } from 'zod';
export declare const quizAssignment: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    allowed_question_attempts: import("zod").ZodNumber;
    allowed_quiz_attempts: import("zod").ZodNullable<import("zod").ZodNumber>;
    pass_threshold: import("zod").ZodNullable<import("zod").ZodNumber>;
    group_id: import("zod").ZodString;
    name: import("zod").ZodString;
    quiz_id: import("zod").ZodString;
    quiz_instance_id: import("zod").ZodNullable<import("zod").ZodString>;
    has_been_quiz_instance_id_randomly_selected: import("zod").ZodBoolean;
    teacher_id: import("zod").ZodString;
    should_randomize_quiz_instance_id: import("zod").ZodBoolean;
    mode: import("zod").ZodEnum<["EXERCISE", "HOMEWORK", "TEST"]>;
    attempt_time: import("zod").ZodNullable<import("zod").ZodNumber>;
    due_date: import("zod").ZodDate;
}>, "strip", import("zod").ZodTypeAny, {
    name: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    quiz_id: string;
    teacher_id: string;
    allowed_question_attempts: number;
    allowed_quiz_attempts: number | null;
    pass_threshold: number | null;
    group_id: string;
    quiz_instance_id: string | null;
    has_been_quiz_instance_id_randomly_selected: boolean;
    should_randomize_quiz_instance_id: boolean;
    mode: "EXERCISE" | "HOMEWORK" | "TEST";
    attempt_time: number | null;
    due_date: Date;
}, {
    name: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    quiz_id: string;
    teacher_id: string;
    allowed_question_attempts: number;
    allowed_quiz_attempts: number | null;
    pass_threshold: number | null;
    group_id: string;
    quiz_instance_id: string | null;
    has_been_quiz_instance_id_randomly_selected: boolean;
    should_randomize_quiz_instance_id: boolean;
    mode: "EXERCISE" | "HOMEWORK" | "TEST";
    attempt_time: number | null;
    due_date: Date;
}>;
export declare type QuizAssignment = TypeOf<typeof quizAssignment>;
