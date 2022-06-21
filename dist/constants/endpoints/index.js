"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ADMINS_1 = __importDefault(require("./ADMINS"));
var AUTH_1 = __importDefault(require("./AUTH"));
var COHORTS_1 = __importDefault(require("./COHORTS"));
var GROUPS_1 = __importDefault(require("./GROUPS"));
var KPIS_1 = __importDefault(require("./KPIS"));
var QUIZ_ASSIGNMENTS_1 = __importDefault(require("./QUIZ_ASSIGNMENTS"));
var QUIZ_ATTEMPTS_1 = __importDefault(require("./QUIZ_ATTEMPTS"));
var QUIZ_INSTANCES_1 = __importDefault(require("./QUIZ_INSTANCES"));
var SCHOOLS_1 = __importDefault(require("./SCHOOLS"));
var STATISTICS_1 = __importDefault(require("./STATISTICS"));
var TEACHERS_1 = __importDefault(require("./TEACHERS"));
var TEMP_1 = __importDefault(require("./TEMP"));
var QUIZES_1 = __importDefault(require("./QUIZES"));
var STUDENTS_1 = __importDefault(require("./STUDENTS"));
var ENDPOINTS = {
    ADMINS: ADMINS_1.default,
    AUTH: AUTH_1.default,
    COHORTS: COHORTS_1.default,
    GROUPS: GROUPS_1.default,
    KPIS: KPIS_1.default,
    QUIZES: QUIZES_1.default,
    QUIZ_ASSIGNMENTS: QUIZ_ASSIGNMENTS_1.default,
    QUIZ_ATTEMPTS: QUIZ_ATTEMPTS_1.default,
    QUIZ_INSTANCES: QUIZ_INSTANCES_1.default,
    SCHOOLS: SCHOOLS_1.default,
    STATISTICS: STATISTICS_1.default,
    STUDENTS: STUDENTS_1.default,
    TEACHERS: TEACHERS_1.default,
    TEMP: TEMP_1.default
};
exports.default = ENDPOINTS;
