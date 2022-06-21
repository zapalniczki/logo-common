import { TypeOf } from 'zod';
export declare const roleRelated: import("zod").ZodObject<{
    email_confirmed: import("zod").ZodBoolean;
    name: import("zod").ZodString;
    email: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    email_confirmed: boolean;
    name: string;
    email: string;
}, {
    email_confirmed: boolean;
    name: string;
    email: string;
}>;
export declare type RoleRelated = TypeOf<typeof roleRelated>;
