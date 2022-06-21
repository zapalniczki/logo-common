import { TypeOf } from 'zod';
export declare const school: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    email_confirmed: import("zod").ZodBoolean;
    name: import("zod").ZodString;
    email: import("zod").ZodString;
}>, {
    admin_id: import("zod").ZodString;
}>, "strip", import("zod").ZodTypeAny, {
    email_confirmed: boolean;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    admin_id: string;
}, {
    email_confirmed: boolean;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    admin_id: string;
}>;
export declare type School = TypeOf<typeof school>;
