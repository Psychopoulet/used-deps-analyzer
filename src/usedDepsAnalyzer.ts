"use strict";

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

// types & interfaces

	// locals

	import { iExtractionResult } from "./interfaces";

	interface iExtractedPackageContent {
		"dependencies"?: { [key:string]: string };
		"devDependencies"?: { [key:string]: string };
	};

	interface iFormattedPackageContent {
		"dependencies": Array<string>;
		"devDependencies": Array<string>;
	};

	export interface iResult {
		"result": boolean;
		"warnings": Array<string>;
		"errors": Array<string>;
	};

// module

export default function usedDepsAnalyzer (packageFile: string, directoryToAnalyze: string, options?: {
	"noDev"?: boolean;
	"onlyDev"?: boolean;
	"overkill"?: Array<string>;
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

			let result: iResult = {
				"result": true,
				"warnings": [],
				"errors": []
			};

				mergeResults(checkNativesModules(extractionResult), result);

				if (options && options.overkill && "object" === typeof options.overkill && options.overkill instanceof Array && options.overkill.length) {
					mergeResults(checkOverkillModules(extractionResult, options.overkill), result);
				}

				/*
				mergeResults(checkUnusedModules(extractionResult), result);
				mergeResults(checkMissingModules(extractionResult), result);*/

			return result;

		});

	});

};
