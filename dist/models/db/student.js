"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
var zod_1 = require("zod");
var group_1 = require("./group");
var roleRelated_1 = require("./roleRelated");
var school_1 = require("./school");
var tableBase_1 = require("./tableBase");
exports.student = tableBase_1.tableBase.merge(roleRelated_1.roleRelated).extend({
    surname: (0, zod_1.string)(),
    group_id: group_1.group.shape.id,
    school_id: school_1.school.shape.id
});
