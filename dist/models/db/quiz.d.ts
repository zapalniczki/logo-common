import { TypeOf } from 'zod';
export declare const quiz: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    created_at: import("zod").ZodDate;
    updated_at: import("zod").ZodDate;
}, {
    id: import("zod").ZodString;
}>, {
    name: import("zod").ZodString;
    category: import("zod").ZodEnum<["CATEGORY_1", "CATEGORY_2", "CATEGORY_3", "CATEGORY_4"]>;
    introduction: import("zod").ZodString;
    level: import("zod").ZodNumber;
}>, "strip", import("zod").ZodTypeAny, {
    name: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    category: "CATEGORY_1" | "CATEGORY_2" | "CATEGORY_3" | "CATEGORY_4";
    introduction: string;
    level: number;
}, {
    name: string;
    created_at: Date;
    updated_at: Date;
    id: string;
    category: "CATEGORY_1" | "CATEGORY_2" | "CATEGORY_3" | "CATEGORY_4";
    introduction: string;
    level: number;
}>;
export declare type Quiz = TypeOf<typeof quiz>;
