"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const node_readline_1 = __importDefault(require("node:readline"));
const node_fs_1 = require("node:fs");
// module
function getExternalModulesFromFile(file) {
    // extract "require" lines
    return new Promise((resolve) => {
        const lines = [];
        node_readline_1.default.createInterface({
            "input": (0, node_fs_1.createReadStream)(file, "utf-8"),
            "crlfDelay": Infinity
        }).on("line", (line) => {
            if (line.includes("require(\"")) {
                lines.push(line.trim());
            }
            else if (line.includes("import ") && line.endsWith("\";")) {
                lines.push(line.trim());
            }
        }).on("close", () => {
            resolve(lines);
        });
        // extract modules
    }).then((lines) => {
        return lines.map((l) => {
            const extract = l.match(/"(.*)"/) || [""];
            return 1 < extract.length ? extract[1] : "";
        }).filter((l) => {
            return "" !== l;
        });
        // filters
    }).then((modules) => {
        return Promise.resolve(
        // remove duplicates
        [
            ...new Set(modules
                // filter non-native modules
                .filter((m) => {
                return !m.startsWith("node:");
            })
                // filter local modules
                .filter((m) => {
                return !m.includes("./");
            }))
        ]);
    });
}
exports.default = getExternalModulesFromFile;
;
