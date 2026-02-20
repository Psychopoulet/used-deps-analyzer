"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkMissingModules;
// locals
const natives_1 = __importDefault(require("./natives"));
// module
function checkMissingModules(extractionResult, dependencies, devDependencies, optionalDependencies, options) {
    const nativesSet = new Set(natives_1.default);
    const depsSet = new Set(dependencies);
    const devDepsSet = new Set(devDependencies);
    const optionalDepsSet = new Set(optionalDependencies);
    let result = true;
    const errors = [];
    const misscalled = (options === null || options === void 0 ? void 0 : options.misscalled) instanceof Array ? options.misscalled : [];
    extractionResult.forEach((f) => {
        f.modules.filter((m) => {
            return !nativesSet.has(m);
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
            if (!depsSet.has(originalModule)
                && !devDepsSet.has(originalModule)
                && !optionalDepsSet.has(originalModule)) {
                errors.push("[MISSING] The module \"" + originalModule + "\" used in the file \"" + f.file + "\" is not registered in package dependencies");
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
