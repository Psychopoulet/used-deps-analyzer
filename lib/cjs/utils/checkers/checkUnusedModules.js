"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkUnusedModules;
// module
function checkUnusedModules(extractionResult, dependencies, devDependencies, options) {
    let result = true;
    const errors = [];
    const usedDepsSet = new Set();
    const misscalled = (options === null || options === void 0 ? void 0 : options.misscalled) instanceof Array ? options.misscalled : [];
    extractionResult.forEach((f) => {
        f.modules.map((m) => {
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
        }).forEach((m) => {
            usedDepsSet.add(m);
        });
    });
    const shadowsSet = new Set((options === null || options === void 0 ? void 0 : options.shadows) instanceof Array ? options.shadows : []);
    if ("object" !== typeof options || "boolean" !== typeof options.onlyDev || !options.onlyDev) {
        dependencies.forEach((dep) => {
            if (!usedDepsSet.has(dep) && !shadowsSet.has(dep)) {
                errors.push("[UNUSED] The installed module \"" + dep + "\" is not used in code");
                result = false;
            }
        });
    }
    if ("object" !== typeof options || "boolean" !== typeof options.noDev || !options.noDev) {
        devDependencies.forEach((dep) => {
            if (!usedDepsSet.has(dep) && !shadowsSet.has(dep)) {
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
