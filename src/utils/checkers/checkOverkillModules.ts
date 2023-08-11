"use strict";

// types & interfaces

	// locals

	import { iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkNativesModules (extractionResult: Array<iExtractionResult>, overkill: Array<string>): iResult {

	const warnings: Array<string> = [];

		extractionResult.forEach((f: iExtractionResult): void => {

			f.modules.forEach((m) => {

				if (overkill.map((o) => {
					return o.trim();
				}).includes(m)) {

					warnings.push(
						"The module \"" + m + "\" used it the file \"" + f.file + "\" may be overkill. You should try to find an alternative."
					);

				}

			});

		});

	return {
		"result": true,
		"warnings": warnings,
		"errors": []
	};

};
