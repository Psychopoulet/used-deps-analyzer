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
	import checkUnusedModules from "./utils/checkers/checkUnusedModules";
	import checkMissingModules from "./utils/checkers/checkMissingModules";

// types & interfaces

	// locals

	import { iOptions, iExtractionResult } from "./interfaces";

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

export default function usedDepsAnalyzer (packageFile: string, directoryToAnalyze: string, options?: iOptions): Promise<iResult> {

	return isFile(packageFile).then((exists: boolean): Promise<void> => {
		return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Package file not found"));
	}).then((): Promise<boolean> => {
		return isDirectory(directoryToAnalyze);
	}).then((exists: boolean): Promise<void> => {
		return exists ? Promise.resolve() : Promise.reject(new ReferenceError("Directory to analyse not found"));
	}).then((): Promise<void> => {
		return !options || !options.noDev || !options.onlyDev ? Promise.resolve() : Promise.reject(new Error("\"noDev\" && \"onlyDev\" options are incompatible"));
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

		return getExternalModulesFromDirectory(directoryToAnalyze).then((extractionResult: Array<iExtractionResult>): iResult => {

			let result: iResult = {
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
					checkMissingModules(extractionResult, dependencies, devDependencies),
					result
				);

			return result;

		});

	});

};
