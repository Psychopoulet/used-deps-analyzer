"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// consts
const NATIVES = [
    "child_process", "crypto", "dgram", "events", "fs", "fs/promises",
    "http", "https", "net", "os", "path", "process", "querystring", "stream", "url",
    "worker_threads"
];
// module
function checkNativesModules(extractionResult) {
    const warnings = [];
    extractionResult.forEach((f) => {
        const notRewritten = f.modules.filter((m) => {
            return NATIVES.includes(m);
        });
        if (notRewritten.length) {
            notRewritten.forEach((m) => {
                warnings.push("[NATIVE] The module \"" + m + "\" used it the file \"" + f.file + "\" does not have the valid syntax. Please use \"node:\" as prefix");
            });
        }
    });
    return {
        "result": true,
        "warnings": warnings,
        "errors": []
    };
}
exports.default = checkNativesModules;
;
