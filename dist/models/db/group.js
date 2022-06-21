"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.group = void 0;
var zod_1 = require("zod");
var cohort_1 = require("./cohort");
var tableBase_1 = require("./tableBase");
exports.group = tableBase_1.tableBase.extend({
    cohort_id: cohort_1.cohort.shape.id,
    level: (0, zod_1.number)(),
    letter: (0, zod_1.string)()
});
