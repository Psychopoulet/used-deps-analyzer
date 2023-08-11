"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
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
;
;
;
// module
function usedDepsAnalyzer(packageFile, directoryToAnalyze, options) {
    return (0, isFile_1.default)(packageFile).then((exists) => {
        return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Package file not found"));
    }).then(() => {
        return (0, isDirectory_1.default)(directoryToAnalyze);
    }).then((exists) => {
        return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Directory to analyse not found"));
    }).then(() => {
        return !options || !options.noDev || !options.onlyDev ? Promise.resolve() : Promise.reject(new Error("\"noDev\" && \"onlyDev\" options are incompatible"));
    }).then(() => {
        return (0, promises_1.readFile)(packageFile, "utf-8").then((content) => {
            return JSON.parse(content);
        }).then(({ dependencies, devDependencies }) => {
            return {
                "dependencies": dependencies ? Object.keys(dependencies) : [],
                "devDependencies": devDependencies ? Object.keys(devDependencies) : []
            };
        });
    }).then(({ dependencies, devDependencies }) => {
        console.log("dependencies", dependencies);
        console.log("devDependencies", devDependencies);
        return (0, getExternalModulesFromDirectory_1.default)(directoryToAnalyze).then((extractionResult) => {
            console.log("extractionResult", extractionResult);
            let result = {
                "result": true,
                "warnings": [],
                "errors": []
            };
            (0, mergeResults_1.default)((0, checkNativesModules_1.default)(extractionResult), result);
            (0, mergeResults_1.default)((0, checkOverkillModules_1.default)(extractionResult, options), result);
            (0, mergeResults_1.default)((0, checkUnusedModules_1.default)(extractionResult, dependencies, devDependencies, options), result);
            // mergeResults(checkMissingModules(extractionResult), result);
            return result;
        });
    });
}
exports.default = usedDepsAnalyzer;
;
