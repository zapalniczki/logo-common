"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRole = void 0;
var zod_1 = require("zod");
exports.userRole = (0, zod_1.enum)(['TEACHER', 'STUDENT', 'SCHOOL', 'ADMIN']);
