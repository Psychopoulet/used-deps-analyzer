"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function checkNativesModules(extractionResult, overkill) {
    const warnings = [];
    extractionResult.forEach((f) => {
        f.modules.forEach((m) => {
            if (overkill.map((o) => {
                return o.trim();
            }).includes(m)) {
                warnings.push("The module \"" + m + "\" used it the file \"" + f.file + "\" may be overkill. You should try to find an alternative.");
            }
        });
    });
    return {
        "result": true,
        "warnings": warnings,
        "errors": []
    };
}
exports.default = checkNativesModules;
;
