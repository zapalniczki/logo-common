import { TypeOf } from 'zod';
export declare const quizAttempt: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    completed_at: import("zod").ZodNullable<import("zod").ZodDate>;
    is_completed: import("zod").ZodBoolean;
    is_started: import("zod").ZodBoolean;
    display_name: import("zod").ZodNullable<import("zod").ZodString>;
    index: import("zod").ZodNumber;
    quiz_assignment_id: import("zod").ZodString;
    quiz_instance_id: import("zod").ZodString;
    started_at: import("zod").ZodNullable<import("zod").ZodDate>;
    student_id: import("zod").ZodString;
}>, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    id: string;
    index: number;
    quiz_instance_id: string;
    completed_at: Date | null;
    is_completed: boolean;
    is_started: boolean;
    display_name: string | null;
    quiz_assignment_id: string;
    started_at: Date | null;
    student_id: string;
}, {
    created_at: Date;
    updated_at: Date;
    id: string;
    index: number;
    quiz_instance_id: string;
    completed_at: Date | null;
    is_completed: boolean;
    is_started: boolean;
    display_name: string | null;
    quiz_assignment_id: string;
    started_at: Date | null;
    student_id: string;
}>;
export declare type QuizAttempt = TypeOf<typeof quizAttempt>;
