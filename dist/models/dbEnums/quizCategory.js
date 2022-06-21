"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizCategory = void 0;
var zod_1 = require("zod");
exports.quizCategory = (0, zod_1.enum)([
    'CATEGORY_1',
    'CATEGORY_2',
    'CATEGORY_3',
    'CATEGORY_4'
]);
