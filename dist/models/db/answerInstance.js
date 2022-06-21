"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerInstance = void 0;
var zod_1 = require("zod");
var answer_1 = require("./answer");
var tableBase_1 = require("./tableBase");
exports.answerInstance = tableBase_1.tableBase.extend({
    value: (0, zod_1.string)(),
    explanation: (0, zod_1.string)().nullable(),
    answer_id: answer_1.answer.shape.id
});
