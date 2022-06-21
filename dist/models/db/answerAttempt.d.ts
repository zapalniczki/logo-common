import { TypeOf } from 'zod';
export declare const answerAttempt: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    answer_instance_id: import("zod").ZodString;
    quiz_attempt_id: import("zod").ZodString;
    score: import("zod").ZodNumber;
}>, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    id: string;
    answer_instance_id: string;
    quiz_attempt_id: string;
    score: number;
}, {
    created_at: Date;
    updated_at: Date;
    id: string;
    answer_instance_id: string;
    quiz_attempt_id: string;
    score: number;
}>;
export declare type AnswerAttempt = TypeOf<typeof answerAttempt>;
