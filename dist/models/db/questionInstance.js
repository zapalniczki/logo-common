"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionInstance = void 0;
var zod_1 = require("zod");
var tableBase_1 = require("./tableBase");
var quizInstance_1 = require("./quizInstance");
var question_1 = require("./question");
exports.questionInstance = tableBase_1.tableBase.extend({
    content: (0, zod_1.string)(),
    quiz_instance_id: quizInstance_1.quizInstance.shape.id,
    question_id: question_1.question.shape.id
});
