import { TypeOf } from 'zod';
export declare const answerInstance: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    value: import("zod").ZodString;
    explanation: import("zod").ZodNullable<import("zod").ZodString>;
    answer_id: import("zod").ZodString;
}>, "strip", import("zod").ZodTypeAny, {
    value: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    explanation: string | null;
    answer_id: string;
}, {
    value: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    explanation: string | null;
    answer_id: string;
}>;
export declare type AnswerInstance = TypeOf<typeof answerInstance>;
