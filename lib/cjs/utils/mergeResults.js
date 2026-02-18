"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mergeResults;
// module
function mergeResults(source, target) {
    target.result && (target.result = source.result);
    source.warnings.forEach((warning) => {
        target.warnings.push(warning);
    });
    source.errors.forEach((error) => {
        target.errors.push(error);
    });
}
