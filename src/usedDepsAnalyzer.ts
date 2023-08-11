"use strict";

// deps

	// natives
	import { readFile } from "node:fs/promises";

	// locals

	import isFile from "./utils/isFile";
	import isDirectory from "./utils/isDirectory";

	import getExternalModulesFromDirectory from "./utils/extractModules/getExternalModulesFromDirectory";

// types & interfaces

	// locals

	import { iExtractionResult } from "./utils/extractModules/getExternalModulesFromDirectory";

	interface iExtractedPackageContent {
		"dependencies"?: { [key:string]: string };
		"devDependencies"?: { [key:string]: string };
	};

	interface iFormattedPackageContent {
		"dependencies": Array<string>;
		"devDependencies": Array<string>;
	};

	interface iResult {
		"result": boolean;
		"warnings": Array<string>;
		"errors": Array<string>;
	};

// module

export default function usedDepsAnalyzer (packageFile: string, directoryToAnalyze: string, options: {
	"no-dev": boolean;
	"only-dev": boolean;
	"overkill": boolean;
}): Promise<iResult> {

	return isFile(packageFile).then((exists: boolean): Promise<void> => {
		return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Package file not found"));
	}).then((): Promise<boolean> => {
		return isDirectory(directoryToAnalyze);
	}).then((exists: boolean): Promise<void> => {
		return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Package file not found"));
	}).then((): Promise<iFormattedPackageContent> => {

		return readFile(packageFile, "utf-8").then((content: string): iExtractedPackageContent => {
			return JSON.parse(content);
		}).then(({ dependencies, devDependencies }: iExtractedPackageContent): iFormattedPackageContent => {

			return {
				"dependencies": dependencies ? Object.keys(dependencies) : [],
				"devDependencies": devDependencies ? Object.keys(devDependencies) : []
			};

		});

	}).then(({ dependencies, devDependencies }: iFormattedPackageContent): Promise<iResult> => {

		console.log("dependencies", dependencies);
		console.log("devDependencies", devDependencies);

		return getExternalModulesFromDirectory(directoryToAnalyze).then((extractionResult: Array<iExtractionResult>): iResult => {

			console.log("extractionResult", extractionResult);

			let result: boolean = true;

				/*result = result && _checkNativesModules(extractionResult);
				result = result && _checkOverkillModules(extractionResult);
				result = result && _checkUnusedModules(extractionResult, dependencies);
				result = result && _checkMissingModules(extractionResult, dependencies, devDependencies);*/

			return {
				"result": result,
				"warnings": [],
				"errors": []
			};

		});

	});

};
