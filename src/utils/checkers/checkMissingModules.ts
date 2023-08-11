"use strict";

// types & interfaces

	// locals

	import { iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkUnusedModules (extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>): iResult {

	let result = true;
	const errors: Array<string> = [];

		let usedDeps: Array<string> = [];

			extractionResult.forEach((f: iExtractionResult): void => {
				usedDeps = [ ...usedDeps, ...f.modules ];
			});

		usedDeps = [ ...new Set(usedDeps) ];

		extractionResult.forEach((f: iExtractionResult): void => {

			f.modules.forEach((m: string): void => {

				if (!dependencies.includes(m) && !devDependencies.includes(m)) {

					errors.push(
						"[MISSING] The module \"" + m + "\" used it the file \"" + f.file + "\" is not registered in package dependencies"
					);

					result = false;

				}

			});

		});

	return {
		"result": result,
		"warnings": [],
		"errors": errors
	};

};
