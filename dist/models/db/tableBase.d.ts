import { TypeOf } from 'zod';
export declare const tableBase: import("zod").ZodObject<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, "strip", import("zod").ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    id: string;
}, {
    created_at: Date;
    updated_at: Date;
    id: string;
}>;
export declare type TableBase = TypeOf<typeof tableBase>;
