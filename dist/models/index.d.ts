import { TypeOf } from 'zod';
export * from './db';
export * from './dbEnums';
export declare const paginator: import("zod").ZodObject<{
    limit: import("zod").ZodOptional<import("zod").ZodNumber>;
    page: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    limit?: number | undefined;
    page?: number | undefined;
}, {
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare type Paginator = TypeOf<typeof paginator>;
export declare const sortingOrder: import("zod").ZodOptional<import("zod").ZodEnum<["ASC", "DESC"]>>;
export declare type SortingOrder = TypeOf<typeof sortingOrder>;
export declare const pagination: import("zod").ZodObject<{
    limit: import("zod").ZodNumber;
    has_next_page: import("zod").ZodBoolean;
    page: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    page: number;
    has_next_page: boolean;
}, {
    limit: number;
    page: number;
    has_next_page: boolean;
}>;
export declare const dataView: import("zod").ZodEnum<["TEACHER", "STUDENT"]>;
export declare type DataView = TypeOf<typeof dataView>;
export declare type Pagination = TypeOf<typeof pagination>;
export declare const quizAttemptResult: import("zod").ZodEnum<["PASS", "NEUTRAL", "FAIL"]>;
export declare type QuizAttemptResult = TypeOf<typeof quizAttemptResult>;
