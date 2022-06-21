"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cohort = void 0;
var zod_1 = require("zod");
var school_1 = require("./school");
var tableBase_1 = require("./tableBase");
exports.cohort = tableBase_1.tableBase.extend({
    school_id: school_1.school.shape.id,
    year: (0, zod_1.number)(),
    is_current: (0, zod_1.boolean)()
});
