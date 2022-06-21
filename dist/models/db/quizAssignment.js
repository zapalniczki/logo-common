"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAssignment = void 0;
var zod_1 = require("zod");
var dbEnums_1 = require("../dbEnums");
var group_1 = require("./group");
var quiz_1 = require("./quiz");
var quizInstance_1 = require("./quizInstance");
var tableBase_1 = require("./tableBase");
var teacher_1 = require("./teacher");
exports.quizAssignment = tableBase_1.tableBase.extend({
    allowed_question_attempts: (0, zod_1.number)().int().positive(),
    allowed_quiz_attempts: (0, zod_1.number)().int().positive().nullable(),
    pass_threshold: (0, zod_1.number)().int().positive().max(100).nullable(),
    group_id: group_1.group.shape.id,
    name: (0, zod_1.string)(),
    quiz_id: quiz_1.quiz.shape.id,
    quiz_instance_id: quizInstance_1.quizInstance.shape.id.nullable(),
    has_been_quiz_instance_id_randomly_selected: (0, zod_1.boolean)(),
    teacher_id: teacher_1.teacher.shape.id,
    should_randomize_quiz_instance_id: (0, zod_1.boolean)(),
    mode: dbEnums_1.quizAssignmentMode,
    attempt_time: (0, zod_1.number)().int().positive().nullable(),
    due_date: (0, zod_1.date)()
});
