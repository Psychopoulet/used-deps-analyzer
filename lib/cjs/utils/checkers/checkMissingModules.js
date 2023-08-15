"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const natives_1 = __importDefault(require("./natives"));
// module
function checkUnusedModules(extractionResult, dependencies, devDependencies, optionalDependencies, options) {
    let result = true;
    const errors = [];
    const misscalled = options && "object" === typeof options.misscalled && options.misscalled instanceof Array ? options.misscalled : [];
    extractionResult.forEach((f) => {
        f.modules.filter((m) => {
            return !natives_1.default.includes(m);
        }).forEach((m) => {
            let originalModule = m;
            if (0 < misscalled.length) {
                const converter = misscalled.find((submodule) => {
                    return m === submodule.call;
                });
                if (converter) {
                    originalModule = converter.module;
                }
            }
            if (!dependencies.includes(originalModule) && !devDependencies.includes(originalModule) && !optionalDependencies.includes(originalModule)) {
                errors.push("[MISSING] The module \"" + originalModule + "\" used it the file \"" + f.file + "\" is not registered in package dependencies");
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
