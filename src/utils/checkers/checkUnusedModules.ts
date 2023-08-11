"use strict";

// types & interfaces

	// locals

	import { iOptions, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkUnusedModules (extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>, options?: iOptions): iResult {

	const warnings: Array<string> = [];

		let usedDeps: Array<string> = [];

			extractionResult.forEach((f: iExtractionResult): void => {
				usedDeps = [ ...usedDeps, ...f.modules ];
			});

		usedDeps = [ ...new Set(usedDeps) ];

		if (!options || !options.noDev) {

			dependencies.forEach((dep: string): void => {

				if (!usedDeps.includes(dep)) {

					warnings.push(
						"The installed module \"" + dep + "\" is not used in code"
					);

				}

			});

		}

		if (!options || !options.onlyDev) {

			devDependencies.forEach((dep: string): void => {

				if (!usedDeps.includes(dep)) {

					warnings.push(
						"The installed dev module \"" + dep + "\" is not used in code"
					);

				}

			});

		}

	return {
		"result": true,
		"warnings": warnings,
		"errors": []
	};

};
