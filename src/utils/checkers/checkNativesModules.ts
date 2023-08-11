"use strict";

// types & interfaces

	// locals

	import { iExtractionResult, iResult } from "../../interfaces";
	import natives from "./natives";

// module

export default function checkNativesModules (extractionResult: Array<iExtractionResult>): iResult {

	const warnings: Array<string> = [];

		extractionResult.forEach((f: iExtractionResult): void => {

			const notRewritten: Array<string> = f.modules.filter((m: string): boolean => {
				return natives.includes(m);
			});

			if (notRewritten.length) {

				notRewritten.forEach((m: string): void => {

					warnings.push(
						"[NATIVE] The module \"" + m + "\" used it the file \"" + f.file + "\" does not have the valid syntax. Please use \"node:\" as prefix"
					);

				});

			}

		});

	return {
		"result": true,
		"warnings": warnings,
		"errors": []
	};

};
