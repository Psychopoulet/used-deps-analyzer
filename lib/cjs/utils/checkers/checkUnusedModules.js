"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function checkUnusedModules(extractionResult, dependencies, devDependencies, options) {
    const warnings = [];
    let usedDeps = [];
    extractionResult.forEach((f) => {
        usedDeps = [...usedDeps, ...f.modules];
    });
    usedDeps = [...new Set(usedDeps)];
    if (!options || !options.noDev) {
        dependencies.forEach((dep) => {
            if (!usedDeps.includes(dep)) {
                warnings.push("The installed module \"" + dep + "\" is not used in code");
            }
        });
    }
    if (!options || !options.onlyDev) {
        devDependencies.forEach((dep) => {
            if (!usedDeps.includes(dep)) {
                warnings.push("The installed dev module \"" + dep + "\" is not used in code");
            }
        });
    }
    return {
        "result": true,
        "warnings": warnings,
        "errors": []
    };
}
exports.default = checkUnusedModules;
;
