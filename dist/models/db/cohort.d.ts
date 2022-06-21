import { TypeOf } from 'zod';
export declare const cohort: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    school_id: import("zod").ZodString;
    year: import("zod").ZodNumber;
    is_current: import("zod").ZodBoolean;
}>, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    id: string;
    school_id: string;
    year: number;
    is_current: boolean;
}, {
    created_at: Date;
    updated_at: Date;
    id: string;
    school_id: string;
    year: number;
    is_current: boolean;
}>;
export declare type Cohort = TypeOf<typeof cohort>;
