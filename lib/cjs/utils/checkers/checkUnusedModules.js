"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function checkUnusedModules(extractionResult, dependencies, devDependencies, options) {
    let result = true;
    const errors = [];
    let usedDeps = [];
    const misscalled = options && "object" === typeof options.misscalled && options.misscalled instanceof Array ? options.misscalled : [];
    extractionResult.forEach((f) => {
        usedDeps = [...usedDeps, ...f.modules.map((m) => {
                let originalModule = m;
                if (misscalled.length) {
                    const converter = misscalled.find((submodule) => {
                        return m === submodule.call;
                    });
                    if (converter) {
                        originalModule = converter.module;
                    }
                }
                return originalModule;
            })];
    });
    usedDeps = [...new Set(usedDeps)];
    const shadows = options && "object" === typeof options.shadows && options.shadows instanceof Array ? options.shadows : [];
    if ("object" !== typeof options || "boolean" !== typeof options.onlyDev || !options.onlyDev) {
        dependencies.forEach((dep) => {
            if (!usedDeps.includes(dep) && !shadows.includes(dep)) {
                errors.push("[UNUSED] The installed module \"" + dep + "\" is not used in code");
                result = false;
            }
        });
    }
    if ("object" !== typeof options || "boolean" !== typeof options.noDev || !options.noDev) {
        devDependencies.forEach((dep) => {
            if (!usedDeps.includes(dep) && !shadows.includes(dep)) {
                errors.push("[UNUSED - DEV] The installed module \"" + dep + "\" is not used in code");
                result = false;
            }
        });
    }
    return {
        "result": result,
        "warnings": [],
        "errors": errors
    };
}
exports.default = checkUnusedModules;
;
