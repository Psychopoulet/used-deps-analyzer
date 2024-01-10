// deps

    // natives
    import { readFile } from "node:fs/promises";

    // locals

    import isFile from "./utils/isFile";
    import isDirectory from "./utils/isDirectory";

    import getExternalModulesFromDirectory from "./utils/extractModules/getExternalModulesFromDirectory";
    import mergeResults from "./utils/mergeResults";
    import checkNativesModules from "./utils/checkers/checkNativesModules";
    import checkOverkillModules from "./utils/checkers/checkOverkillModules";
    import checkUnusedModules from "./utils/checkers/checkUnusedModules";
    import checkMissingModules from "./utils/checkers/checkMissingModules";

// types & interfaces

    // locals

    import type { iOptions, iExtractionResult } from "./interfaces";

    interface iExtractedPackageContent {
        "dependencies"?: Record<string, string>;
        "devDependencies"?: Record<string, string>;
        "optionalDependencies"?: Record<string, string>;
    }

    interface iFormattedPackageContent {
        "dependencies": string[];
        "devDependencies": string[];
        "optionalDependencies": string[];
    }

    export interface iResult {
        "result": boolean;
        "warnings": string[];
        "errors": string[];
    }

// module

export default async function usedDepsAnalyzer (
    packageFile: string,
    directoryToAnalyze: string,
    options?: iOptions
): Promise<iResult> {

    return isFile(packageFile).then(async (exists: boolean): Promise<void> => {
        return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Package file not found"));
    }).then(async (): Promise<boolean> => {
        return isDirectory(directoryToAnalyze);
    }).then(async (exists: boolean): Promise<void> => {
        return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Directory to analyse not found"));
    }).then(async (): Promise<void> => {
        return !options || !options.noDev || !options.onlyDev ? Promise.resolve() : Promise.reject(new Error("\"noDev\" && \"onlyDev\" options are incompatible"));
    }).then(async (): Promise<iFormattedPackageContent> => {

        return readFile(packageFile, "utf-8").then((content: string): iExtractedPackageContent => {
            return JSON.parse(content);
        }).then(({
            dependencies,
            devDependencies,
            optionalDependencies
        }: iExtractedPackageContent): iFormattedPackageContent => {

            return {
                "dependencies": dependencies ? Object.keys(dependencies) : [],
                "devDependencies": devDependencies ? Object.keys(devDependencies) : [],
                "optionalDependencies": optionalDependencies ? Object.keys(optionalDependencies) : []
            };

        });

    }).then(async ({ dependencies, devDependencies, optionalDependencies }: iFormattedPackageContent): Promise<iResult> => {

        return getExternalModulesFromDirectory(directoryToAnalyze).then((extractionResult: readonly iExtractionResult[]): iResult => {

            const result: iResult = {
                "result": true,
                "warnings": [],
                "errors": []
            };

                mergeResults(
                    checkNativesModules(extractionResult),
                    result
                );

                mergeResults(
                    checkOverkillModules(extractionResult, options),
                    result
                );

                mergeResults(
                    checkUnusedModules(extractionResult, dependencies, devDependencies, options),
                    result
                );

                mergeResults(
                    checkMissingModules(extractionResult, dependencies, devDependencies, optionalDependencies, options),
                    result
                );

            return result;

        });

    });

}
