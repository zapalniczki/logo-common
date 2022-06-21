import { TypeOf } from 'zod';
export declare const userRole: import("zod").ZodEnum<["TEACHER", "STUDENT", "SCHOOL", "ADMIN"]>;
export declare type UserRole = TypeOf<typeof userRole>;
