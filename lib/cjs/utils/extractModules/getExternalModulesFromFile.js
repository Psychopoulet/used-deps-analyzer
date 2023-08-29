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
            const standardized = line.trim().replace(/'/g, "\"").replace(/\\/g, "/");
            // extract "require" modules (node)
            if (standardized.includes("require(\"")) {
                lines.push(standardized);
            }
            // extract "import" modules (TS)
            else if (standardized.includes("import ") && ((standardized.endsWith("\";") || standardized.endsWith("\");")))) {
                lines.push(standardized);
            }
            // extract not required modules (read specific absolute file)
            else if (standardized.includes("\"node_modules\"")) {
                const path = standardized.split(",");
                const nodeModulesFoundAt = path.findIndex((data) => {
                    return "\"node_modules\"" === data.trim();
                });
                if (-1 < nodeModulesFoundAt && path[nodeModulesFoundAt + 1]) {
                    lines.push("require(\"" + path[nodeModulesFoundAt + 1].trim().replace(/"/g, "") + "\")");
                }
            }
            // extract not required modules (read specific relative file)
            else if (standardized.includes("node_modules/")) {
                const path = standardized.split("/");
                const nodeModulesFoundAt = path.findIndex((data) => {
                    return "node_modules" === data.trim();
                });
                if (-1 < nodeModulesFoundAt && path[nodeModulesFoundAt + 1]) {
                    lines.push("require(\"" + path[nodeModulesFoundAt + 1].trim() + "\")");
                }
            }
        }).on("close", () => {
            resolve(lines);
        });
        // extract modules
    }).then((lines) => {
        // remove useless path format
        return lines.map((l) => {
            const reg = l.includes("join(") ? /join\((.*)\)/ : /"(.*)"/;
            const extract = l.match(reg) || [""];
            return 1 < extract.length ? extract[1] : "";
            // avoid empty strings
        }).filter((m) => {
            return "" !== m;
        }).map((m) => {
            let separator = "";
            if (m.includes(",")) {
                separator = ",";
            }
            else if (m.includes("/")) {
                separator = "/";
            }
            if (separator) {
                const parts = m.replace(/"/g, "").split(separator).map((s) => {
                    return s.trim();
                });
                const findModulesDirAt = parts.findIndex((p) => {
                    return "node_modules" === p;
                });
                if (-1 < findModulesDirAt && parts[findModulesDirAt + 1]) {
                    return parts[findModulesDirAt + 1];
                }
                else {
                    return m;
                }
            }
            else {
                return m;
            }
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
