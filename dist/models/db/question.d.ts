import { TypeOf } from 'zod';
export declare const question: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    content: import("zod").ZodString;
    quiz_id: import("zod").ZodString;
    index: import("zod").ZodNumber;
    points: import("zod").ZodNumber;
}>, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    id: string;
    content: string;
    quiz_id: string;
    index: number;
    points: number;
}, {
    created_at: Date;
    updated_at: Date;
    id: string;
    content: string;
    quiz_id: string;
    index: number;
    points: number;
}>;
export declare type Question = TypeOf<typeof question>;
