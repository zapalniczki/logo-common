"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answer = void 0;
var zod_1 = require("zod");
var question_1 = require("./question");
var tableBase_1 = require("./tableBase");
exports.answer = tableBase_1.tableBase.extend({
    question_id: question_1.question.shape.id,
    is_correct: (0, zod_1.boolean)(),
    value: (0, zod_1.string)(),
    explanation: (0, zod_1.string)().nullable()
});
