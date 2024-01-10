"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
// module
function checkNativesModules(extractionResult, options) {
    const warnings = [];
    const overkill = options && "object" === typeof options.overkill && options.overkill instanceof Array ? options.overkill : [];
    if (overkill.length) {
        extractionResult.forEach((f) => {
            f.modules.forEach((m) => {
                if (overkill.map((o) => {
                    return o.trim();
                }).includes(m)) {
                    warnings.push("[OVERKILL] The module \"" + m + "\" used it the file \"" + f.file + "\" may be overkill. You should try to find an alternative.");
                }
            });
        });
    }
    return {
        "result": true,
        "warnings": warnings,
        "errors": []
    };
}
exports.default = checkNativesModules;
