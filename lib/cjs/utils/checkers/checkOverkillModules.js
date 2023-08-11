"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function checkNativesModules(extractionResult, options) {
    const warnings = [];
    if (options && options.overkill && "object" === typeof options.overkill && options.overkill instanceof Array && options.overkill.length) {
        extractionResult.forEach((f) => {
            f.modules.forEach((m) => {
                if (options.overkill.map((o) => {
                    return o.trim();
                }).includes(m)) {
                    warnings.push("The module \"" + m + "\" used it the file \"" + f.file + "\" may be overkill. You should try to find an alternative.");
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
;
