"use strict";

// types & interfaces

	// locals

	import { iOptions, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkNativesModules (extractionResult: Array<iExtractionResult>, options?: iOptions): iResult {

	const warnings: Array<string> = [];

		if (options && options.overkill && "object" === typeof options.overkill && options.overkill instanceof Array && options.overkill.length) {

			extractionResult.forEach((f: iExtractionResult): void => {

				f.modules.forEach((m: string): void => {

					if ((options.overkill as Array<string>).map((o: string): string => {
						return o.trim();
					}).includes(m)) {

						warnings.push(
							"The module \"" + m + "\" used it the file \"" + f.file + "\" may be overkill. You should try to find an alternative."
						);

					}

				});

			});

		}

	return {
		"result": true,
		"warnings": warnings,
		"errors": []
	};

};
