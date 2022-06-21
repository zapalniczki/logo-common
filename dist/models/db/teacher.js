"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacher = void 0;
var zod_1 = require("zod");
var roleRelated_1 = require("./roleRelated");
var tableBase_1 = require("./tableBase");
var school_1 = require("./school");
exports.teacher = tableBase_1.tableBase.merge(roleRelated_1.roleRelated).extend({
    surname: (0, zod_1.string)(),
    school_id: school_1.school.shape.id,
    blocked: (0, zod_1.boolean)()
});
