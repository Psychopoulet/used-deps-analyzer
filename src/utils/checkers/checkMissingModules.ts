"use strict";

// types & interfaces

	// locals

	import { iOptions, iSubModule, iExtractionResult, iResult } from "../../interfaces";
	import natives from "./natives";

// module

export default function checkUnusedModules (extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>, options?: iOptions): iResult {

	let result = true;
	const errors: Array<string> = [];

		extractionResult.forEach((f: iExtractionResult): void => {

			f.modules.filter((m: string): boolean => {
				return !natives.includes(m);
			}).forEach((m: string): void => {

				let originalModule: string = m;

				if (options && "object" === typeof options.submodules && options.submodules instanceof Array && 0 < options.submodules.length) {

					const converter: iSubModule | undefined = options.submodules.find((submodule: iSubModule): boolean => {
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
