"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizInstance = void 0;
var zod_1 = require("zod");
var teacher_1 = require("./teacher");
var quiz_1 = require("./quiz");
var tableBase_1 = require("./tableBase");
exports.quizInstance = tableBase_1.tableBase.extend({
    quiz_id: quiz_1.quiz.shape.id,
    name: (0, zod_1.string)(),
    teacher_id: teacher_1.teacher.shape.id,
    index: (0, zod_1.number)().positive()
});
