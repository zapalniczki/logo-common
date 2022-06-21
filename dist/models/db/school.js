"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.school = void 0;
var admin_1 = require("./admin");
var roleRelated_1 = require("./roleRelated");
var tableBase_1 = require("./tableBase");
exports.school = tableBase_1.tableBase.merge(roleRelated_1.roleRelated).extend({
    admin_id: admin_1.admin.shape.id
});
