"use strict";
// module
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filterFiles;
function filterFiles(f) {
    return f.endsWith(".js") || f.endsWith(".cjs") || f.endsWith(".ts") || f.endsWith(".cts");
}
