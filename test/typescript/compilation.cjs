/// <reference path="../../lib/cjs/main.d.cts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const node_path_1 = require("node:path");
// locals
const usedDepsAnalyzer = require("../../lib/cjs/main.cjs");
// consts
const packageFile = (0, node_path_1.join)(__dirname, "..", "..", "package.json");
const sourceDirectory = (0, node_path_1.join)(__dirname, "..", "..", "src");
// module
usedDepsAnalyzer(packageFile, sourceDirectory).then((analyze) => {
    if (analyze.warnings) {
        analyze.warnings.forEach((a) => {
            console.warn(a);
        });
    }
    if (analyze.result) {
        console.log("all ok");
    }
    else {
        analyze.errors.forEach((a) => {
            console.error(a);
        });
    }
}).catch((err) => {
    console.error(err);
    process.exitCode = 1;
    process.exit(1);
});
