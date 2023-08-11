"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const node_path_1 = require("node:path");
const promises_1 = require("node:fs/promises");
// locals
const isFile_1 = __importDefault(require("../isFile"));
const isDirectory_1 = __importDefault(require("../isDirectory"));
const filterFiles_1 = __importDefault(require("./filterFiles"));
const getExternalModulesFromFile_1 = __importDefault(require("./getExternalModulesFromFile"));
// private
// methods
function _getExternalModulesFromFiles(files, result = []) {
    return !files.length ? Promise.resolve(result) : Promise.resolve().then(() => {
        const file = files.shift();
        return (0, getExternalModulesFromFile_1.default)(file).then((modules) => {
            if (modules.length) {
                result.push({
                    "file": file,
                    "modules": modules
                });
            }
        });
        // loop
    }).then(() => {
        return _getExternalModulesFromFiles(files, result);
    });
}
function _getExternalModulesFromDirectories(directories, result = []) {
    return !directories.length ? Promise.resolve(result) : Promise.resolve().then(() => {
        const directory = directories.shift();
        return _getExternalModulesFromDirectory(directory).then((directoryModules) => {
            directoryModules.forEach((dm) => {
                result.push(dm);
            });
        });
        // loop
    }).then(() => {
        return _getExternalModulesFromDirectories(directories, result);
    });
}
function _getExternalModulesFromDirectory(directory) {
    let result = [];
    return (0, promises_1.readdir)(directory).then((content) => {
        const files = [];
        const dirs = [];
        return Promise.all(content.map((f) => {
            const item = (0, node_path_1.join)(directory, f);
            return (0, isFile_1.default)(item).then((isThisItemAFile) => {
                if (isThisItemAFile) {
                    files.push(item);
                }
                else {
                    return (0, isDirectory_1.default)(item).then((isThisItemADirectory) => {
                        if (isThisItemADirectory) {
                            dirs.push(item);
                        }
                    });
                }
            });
        })).then(() => {
            return _getExternalModulesFromFiles(files.filter(filterFiles_1.default)).then((filesModules) => {
                if (filesModules.length) {
                    result = [...result, ...filesModules];
                }
            });
        }).then(() => {
            return _getExternalModulesFromDirectories(dirs).then((directoriesModules) => {
                if (directoriesModules.length) {
                    result = [...result, ...directoriesModules];
                }
            });
        }).then(() => {
            return Promise.resolve(result);
        });
    });
}
// module
function getExternalModulesFromDirectory(directory) {
    return _getExternalModulesFromDirectory(directory);
}
exports.default = getExternalModulesFromDirectory;
;
