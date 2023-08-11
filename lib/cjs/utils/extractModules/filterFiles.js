"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function filterFiles(f) {
    return f.endsWith(".js") || f.endsWith(".cjs") || f.endsWith(".ts") || f.endsWith(".cts");
}
exports.default = filterFiles;
;
