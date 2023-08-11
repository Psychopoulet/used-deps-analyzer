"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function checkUnusedModules(extractionResult, dependencies, devDependencies) {
    let result = true;
    const errors = [];
    let usedDeps = [];
    extractionResult.forEach((f) => {
        usedDeps = [...usedDeps, ...f.modules];
    });
    usedDeps = [...new Set(usedDeps)];
    extractionResult.forEach((f) => {
        f.modules.forEach((m) => {
            if (!dependencies.includes(m) && !devDependencies.includes(m)) {
                errors.push("The module \"" + m + "\" used it the file \"" + f.file + "\" is not registered in package dependencies");
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
