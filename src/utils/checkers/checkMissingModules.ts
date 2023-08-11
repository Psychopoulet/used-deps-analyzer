"use strict";

// types & interfaces

	// locals

	import { iExtractionResult, iResult } from "../../interfaces";
	import natives from "./natives";

// module

export default function checkUnusedModules (extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>): iResult {

	let result = true;
	const errors: Array<string> = [];

		extractionResult.forEach((f: iExtractionResult): void => {

			f.modules.filter((m: string): boolean => {
				return !natives.includes(m);
			}).forEach((m: string): void => {

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
