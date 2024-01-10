"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// natives
const promises_1 = require("node:fs/promises");
// locals
const isFile_1 = __importDefault(require("./utils/isFile"));
const isDirectory_1 = __importDefault(require("./utils/isDirectory"));
const getExternalModulesFromDirectory_1 = __importDefault(require("./utils/extractModules/getExternalModulesFromDirectory"));
const mergeResults_1 = __importDefault(require("./utils/mergeResults"));
const checkNativesModules_1 = __importDefault(require("./utils/checkers/checkNativesModules"));
const checkOverkillModules_1 = __importDefault(require("./utils/checkers/checkOverkillModules"));
const checkUnusedModules_1 = __importDefault(require("./utils/checkers/checkUnusedModules"));
const checkMissingModules_1 = __importDefault(require("./utils/checkers/checkMissingModules"));
// module
function usedDepsAnalyzer(packageFile, directoryToAnalyze, options) {
    return (0, isFile_1.default)(packageFile).then((exists) => {
        return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Package file not found"));
    }).then(() => {
        return (0, isDirectory_1.default)(directoryToAnalyze);
    }).then((exists) => {
        return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Directory to analyse not found"));
    }).then(() => {
        const onlyDev = "object" === typeof options && "boolean" === typeof options.onlyDev && options.onlyDev;
        const noDev = "object" === typeof options && "boolean" === typeof options.noDev && options.noDev;
        return onlyDev && noDev ? Promise.reject(new Error("\"noDev\" && \"onlyDev\" options are incompatible")) : Promise.resolve();
    }).then(() => {
        return (0, promises_1.readFile)(packageFile, "utf-8").then((content) => {
            return JSON.parse(content);
        }).then(({ dependencies, devDependencies, optionalDependencies }) => {
            return {
                "dependencies": dependencies ? Object.keys(dependencies) : [],
                "devDependencies": devDependencies ? Object.keys(devDependencies) : [],
                "optionalDependencies": optionalDependencies ? Object.keys(optionalDependencies) : []
            };
        });
    }).then(({ dependencies, devDependencies, optionalDependencies }) => {
        return (0, getExternalModulesFromDirectory_1.default)(directoryToAnalyze).then((extractionResult) => {
            const result = {
                "result": true,
                "warnings": [],
                "errors": []
            };
            (0, mergeResults_1.default)((0, checkNativesModules_1.default)(extractionResult), result);
            (0, mergeResults_1.default)((0, checkOverkillModules_1.default)(extractionResult, options), result);
            (0, mergeResults_1.default)((0, checkUnusedModules_1.default)(extractionResult, dependencies, devDependencies, options), result);
            (0, mergeResults_1.default)((0, checkMissingModules_1.default)(extractionResult, dependencies, devDependencies, optionalDependencies, options), result);
            return result;
        });
    });
}
exports.default = usedDepsAnalyzer;
