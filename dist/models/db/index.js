"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./admin"), exports);
__exportStar(require("./answer"), exports);
__exportStar(require("./answerAttempt"), exports);
__exportStar(require("./answerInstance"), exports);
__exportStar(require("./cohort"), exports);
__exportStar(require("./group"), exports);
__exportStar(require("./question"), exports);
__exportStar(require("./questionInstance"), exports);
__exportStar(require("./quiz"), exports);
__exportStar(require("./quizAssignment"), exports);
__exportStar(require("./quizAttempt"), exports);
__exportStar(require("./quizInstance"), exports);
__exportStar(require("./roleRelated"), exports);
__exportStar(require("./school"), exports);
__exportStar(require("./student"), exports);
__exportStar(require("./tableBase"), exports);
__exportStar(require("./teacher"), exports);
__exportStar(require("./timestamps"), exports);
