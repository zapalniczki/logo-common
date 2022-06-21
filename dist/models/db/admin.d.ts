import { TypeOf } from 'zod';
export declare const admin: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    email_confirmed: import("zod").ZodBoolean;
    name: import("zod").ZodString;
    email: import("zod").ZodString;
}>, {
    surname: import("zod").ZodString;
}>, "strip", import("zod").ZodTypeAny, {
    email_confirmed: boolean;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    surname: string;
}, {
    email_confirmed: boolean;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    surname: string;
}>;
export declare type Admin = TypeOf<typeof admin>;
