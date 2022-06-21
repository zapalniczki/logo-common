"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttempt = void 0;
var zod_1 = require("zod");
var quizAssignment_1 = require("./quizAssignment");
var quizInstance_1 = require("./quizInstance");
var student_1 = require("./student");
var tableBase_1 = require("./tableBase");
exports.quizAttempt = tableBase_1.tableBase.extend({
    completed_at: (0, zod_1.date)().nullable(),
    is_completed: (0, zod_1.boolean)(),
    is_started: (0, zod_1.boolean)(),
    display_name: (0, zod_1.string)().nullable(),
    index: (0, zod_1.number)(),
    quiz_assignment_id: quizAssignment_1.quizAssignment.shape.id,
    quiz_instance_id: quizInstance_1.quizInstance.shape.id,
    started_at: (0, zod_1.date)().nullable(),
    student_id: student_1.student.shape.id
});
