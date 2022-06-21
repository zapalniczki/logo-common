"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttemptResult = exports.dataView = exports.pagination = exports.sortingOrder = exports.paginator = void 0;
var zod_1 = require("zod");
__exportStar(require("./db"), exports);
__exportStar(require("./dbEnums"), exports);
exports.paginator = (0, zod_1.object)({
    limit: (0, zod_1.number)().optional(),
    page: (0, zod_1.number)().optional()
});
exports.sortingOrder = (0, zod_1.enum)(['ASC', 'DESC']).optional();
exports.pagination = (0, zod_1.object)({
    limit: (0, zod_1.number)(),
    has_next_page: (0, zod_1.boolean)(),
    page: (0, zod_1.number)()
});
exports.dataView = (0, zod_1.enum)(['TEACHER', 'STUDENT']);
exports.quizAttemptResult = (0, zod_1.enum)(['PASS', 'NEUTRAL', 'FAIL']);
