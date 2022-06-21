import { TypeOf } from 'zod';
export declare const quizInstance: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    quiz_id: import("zod").ZodString;
    name: import("zod").ZodString;
    teacher_id: import("zod").ZodString;
    index: import("zod").ZodNumber;
}>, "strip", import("zod").ZodTypeAny, {
    name: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    quiz_id: string;
    index: number;
    teacher_id: string;
}, {
    name: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    quiz_id: string;
    index: number;
    teacher_id: string;
}>;
export declare type QuizInstance = TypeOf<typeof quizInstance>;
