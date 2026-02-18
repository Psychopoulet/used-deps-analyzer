"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkNativesModules;
// locals
const natives_1 = __importDefault(require("./natives"));
// module
function checkNativesModules(extractionResult) {
    const warnings = [];
    extractionResult.forEach((f) => {
        const notRewritten = f.modules.filter((m) => {
            return natives_1.default.includes(m);
        });
        if (notRewritten.length) {
            notRewritten.forEach((m) => {
                warnings.push("[NATIVE] The module \"" + m + "\" used it the file \"" + f.file + "\" does not have the valid syntax. Please use \"node:\" as prefix");
            });
        }
    });
    return {
        "result": true,
        "warnings": warnings,
        "errors": []
    };
}
