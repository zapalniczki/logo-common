"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableBase = void 0;
var zod_1 = require("zod");
var timestamps_1 = require("./timestamps");
exports.tableBase = timestamps_1.timestamps.extend({
    id: (0, zod_1.string)().uuid()
});
