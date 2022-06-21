"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quiz = void 0;
var dbEnums_1 = require("../dbEnums");
var zod_1 = require("zod");
var tableBase_1 = require("./tableBase");
exports.quiz = tableBase_1.tableBase.extend({
    name: (0, zod_1.string)(),
    category: dbEnums_1.quizCategory,
    introduction: (0, zod_1.string)(),
    level: (0, zod_1.number)().int().positive()
});
