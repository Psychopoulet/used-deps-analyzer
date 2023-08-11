"use strict";

// types & interfaces

	// locals

	import { iExtractionResult, iResult } from "../../interfaces";

// consts

	const NATIVES = [
		"child_process", "crypto", "dgram", "events", "fs", "fs/promises",
		"http", "https", "net", "os", "path", "process", "querystring", "stream", "url",
		"worker_threads"
	];

// module

export default function checkNativesModules (extractionResult: Array<iExtractionResult>): iResult {

	const warnings: Array<string> = [];

		extractionResult.forEach((f: iExtractionResult): void => {

			const notRewritten: Array<string> = f.modules.filter((m: string): boolean => {
				return NATIVES.includes(m);
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
