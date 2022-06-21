"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.question = void 0;
var zod_1 = require("zod");
var quiz_1 = require("./quiz");
var tableBase_1 = require("./tableBase");
exports.question = tableBase_1.tableBase.extend({
    content: (0, zod_1.string)(),
    quiz_id: quiz_1.quiz.shape.id,
    index: (0, zod_1.number)(),
    points: (0, zod_1.number)()
});
