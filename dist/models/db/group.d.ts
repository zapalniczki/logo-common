import { TypeOf } from 'zod';
export declare const group: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    cohort_id: import("zod").ZodString;
    level: import("zod").ZodNumber;
    letter: import("zod").ZodString;
}>, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    id: string;
    level: number;
    cohort_id: string;
    letter: string;
}, {
    created_at: Date;
    updated_at: Date;
    id: string;
    level: number;
    cohort_id: string;
    letter: string;
}>;
export declare type Group = TypeOf<typeof group>;
