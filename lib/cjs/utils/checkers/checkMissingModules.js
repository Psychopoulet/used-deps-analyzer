"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const natives_1 = __importDefault(require("./natives"));
// module
function checkUnusedModules(extractionResult, dependencies, devDependencies) {
    let result = true;
    const errors = [];
    extractionResult.forEach((f) => {
        f.modules.filter((m) => {
            return !natives_1.default.includes(m);
        }).forEach((m) => {
            if (!dependencies.includes(m) && !devDependencies.includes(m)) {
                errors.push("[MISSING] The module \"" + m + "\" used it the file \"" + f.file + "\" is not registered in package dependencies");
                result = false;
            }
        });
    });
    return {
        "result": result,
        "warnings": [],
        "errors": errors
    };
}
exports.default = checkUnusedModules;
;
