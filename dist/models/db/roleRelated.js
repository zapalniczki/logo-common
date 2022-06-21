"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRelated = void 0;
var zod_1 = require("zod");
exports.roleRelated = (0, zod_1.object)({
    email_confirmed: (0, zod_1.boolean)(),
    name: (0, zod_1.string)(),
    email: (0, zod_1.string)().email()
});
