import { TypeOf } from 'zod';
export declare const timestamps: import("zod").ZodObject<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
}, {
    created_at: Date;
    updated_at: Date;
}>;
export declare type TimeStamps = TypeOf<typeof timestamps>;
