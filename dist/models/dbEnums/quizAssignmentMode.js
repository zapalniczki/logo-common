"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAssignmentMode = void 0;
var zod_1 = require("zod");
exports.quizAssignmentMode = (0, zod_1.enum)(['EXERCISE', 'HOMEWORK', 'TEST']);
