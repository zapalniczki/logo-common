import { TypeOf } from 'zod';
export declare const answer: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    question_id: import("zod").ZodString;
    is_correct: import("zod").ZodBoolean;
    value: import("zod").ZodString;
    explanation: import("zod").ZodNullable<import("zod").ZodString>;
}>, "strip", import("zod").ZodTypeAny, {
    value: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    question_id: string;
    is_correct: boolean;
    explanation: string | null;
}, {
    value: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    question_id: string;
    is_correct: boolean;
    explanation: string | null;
}>;
export declare type Answer = TypeOf<typeof answer>;
