"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isDirectory;
// natives
const node_fs_1 = require("node:fs");
// module
function isDirectory(directory) {
    return new Promise((resolve, reject) => {
        if ("undefined" === typeof directory) {
            return reject(new ReferenceError("missing \"directory\" argument"));
        }
        else if ("string" !== typeof directory) {
            return reject(new TypeError("\"directory\" argument is not a string"));
        }
        else if ("" === directory.trim()) {
            return reject(new Error("\"directory\" argument is empty"));
        }
        else {
            return (0, node_fs_1.lstat)(directory, (err, stats) => {
                return resolve(Boolean(!err && stats.isDirectory()));
            });
        }
    });
}
