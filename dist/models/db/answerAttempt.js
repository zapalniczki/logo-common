"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerAttempt = void 0;
var zod_1 = require("zod");
var answerInstance_1 = require("./answerInstance");
var quizAttempt_1 = require("./quizAttempt");
var tableBase_1 = require("./tableBase");
exports.answerAttempt = tableBase_1.tableBase.extend({
    answer_instance_id: answerInstance_1.answerInstance.shape.id,
    quiz_attempt_id: quizAttempt_1.quizAttempt.shape.id,
    score: (0, zod_1.number)()
});
