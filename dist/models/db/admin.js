"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
var zod_1 = require("zod");
var roleRelated_1 = require("./roleRelated");
var tableBase_1 = require("./tableBase");
exports.admin = tableBase_1.tableBase.merge(roleRelated_1.roleRelated).extend({
    surname: (0, zod_1.string)()
});
