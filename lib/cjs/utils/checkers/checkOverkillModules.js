"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkOverkillModules;
// module
function checkOverkillModules(extractionResult, options) {
    const warnings = [];
    const overkillSet = new Set(((options === null || options === void 0 ? void 0 : options.overkill) instanceof Array ? options.overkill : []).map((o) => {
        return o.trim();
    }));
    if (overkillSet.size) {
        extractionResult.forEach((f) => {
            f.modules.forEach((m) => {
                if (overkillSet.has(m)) {
                    warnings.push("[OVERKILL] The module \"" + m + "\" used in the file \"" + f.file + "\" may be overkill. You should try to find an alternative.");
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
