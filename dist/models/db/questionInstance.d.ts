import { TypeOf } from 'zod';
export declare const questionInstance: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    content: import("zod").ZodString;
    quiz_instance_id: import("zod").ZodString;
    question_id: import("zod").ZodString;
}>, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    id: string;
    content: string;
    question_id: string;
    quiz_instance_id: string;
}, {
    created_at: Date;
    updated_at: Date;
    id: string;
    content: string;
    question_id: string;
    quiz_instance_id: string;
}>;
export declare type QuestionInstance = TypeOf<typeof questionInstance>;
