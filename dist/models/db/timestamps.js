"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamps = void 0;
var zod_1 = require("zod");
exports.timestamps = (0, zod_1.object)({
    created_at: (0, zod_1.date)(),
    updated_at: (0, zod_1.date)()
});
