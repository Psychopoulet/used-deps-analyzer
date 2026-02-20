"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isFile;
// natives
const node_fs_1 = require("node:fs");
// module
function isFile(file) {
    return new Promise((resolve, reject) => {
        if ("undefined" === typeof file) {
            return reject(new ReferenceError("missing \"file\" argument"));
        }
        else if ("string" !== typeof file) {
            return reject(new TypeError("\"file\" argument is not a string"));
        }
        else if ("" === file.trim()) {
            return reject(new Error("\"file\" argument is empty"));
        }
        else {
            return (0, node_fs_1.lstat)(file, (err, stats) => {
                return resolve(Boolean(!err && stats.isFile()));
            });
        }
    });
}
