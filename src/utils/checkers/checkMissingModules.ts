"use strict";

// types & interfaces

	// locals

	import { iOptions, iSubModule, iExtractionResult, iResult } from "../../interfaces";
	import natives from "./natives";

// module

export default function checkUnusedModules (extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>, options?: iOptions): iResult {

	let result = true;
	const errors: Array<string> = [];

		const misscalled: Array<iSubModule> = options && "object" === typeof options.misscalled && options.misscalled instanceof Array ? options.misscalled : [];

		extractionResult.forEach((f: iExtractionResult): void => {

			f.modules.filter((m: string): boolean => {
				return !natives.includes(m);
			}).forEach((m: string): void => {

				let originalModule: string = m;

				if (0 < misscalled.length) {

					const converter: iSubModule | undefined = misscalled.find((submodule: iSubModule): boolean => {
						return m === submodule.call;
					});

					if (converter) {
						originalModule = converter.module;
					}

				}

				if (!dependencies.includes(originalModule) && !devDependencies.includes(originalModule)) {

					errors.push(
						"[MISSING] The module \"" + originalModule + "\" used it the file \"" + f.file + "\" is not registered in package dependencies"
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
