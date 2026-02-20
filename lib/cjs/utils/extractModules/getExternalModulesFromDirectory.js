"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getExternalModulesFromDirectory;
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
function _getExternalModulesFromFiles(files) {
    return Promise.all(files.map((file) => {
        return (0, getExternalModulesFromFile_1.default)(file).then((modules) => {
            return {
                "file": file,
                "modules": modules
            };
        });
    }));
}
function _getExternalModulesFromDirectories(directories) {
    const result = [];
    return Promise.all(directories.map((directory) => {
        return _getExternalModulesFromDirectory(directory).then((directoryModules) => {
            directoryModules.forEach((dm) => {
                result.push(dm);
            });
        });
    })).then(() => {
        return Promise.resolve(result);
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
                    return Promise.resolve();
                }
                else {
                    return (0, isDirectory_1.default)(item).then((isThisItemADirectory) => {
                        if (isThisItemADirectory && "node_modules" !== f) {
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
