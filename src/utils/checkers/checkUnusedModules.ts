"use strict";

// types & interfaces

	// locals

	import { iOptions, iSubModule, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkUnusedModules (extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>, options?: iOptions): iResult {

	let result = true;
	const errors: Array<string> = [];

		let usedDeps: Array<string> = [];

			extractionResult.forEach((f: iExtractionResult): void => {

				usedDeps = [ ...usedDeps, ...f.modules.map((m: string): string => {

					let originalModule: string = m;

						if (options && "object" === typeof options.submodules && options.submodules instanceof Array && 0 < options.submodules.length) {

							const converter: iSubModule | undefined = options.submodules.find((submodule: iSubModule): boolean => {
								return m === submodule.call;
							});

							if (converter) {
								originalModule = converter.module;
							}

						}

					return originalModule;

				}) ];

			});

		usedDeps = [ ...new Set(usedDeps) ];

		if ("object" !== typeof options || "boolean" !== typeof options.onlyDev || !options.onlyDev) {

			dependencies.forEach((dep: string): void => {

				if (!usedDeps.includes(dep)) {

					errors.push(
						"[UNUSED] The installed module \"" + dep + "\" is not used in code"
					);

					result = false;

				}

			});

		}

		if ("object" !== typeof options || "boolean" !== typeof options.noDev || !options.noDev) {

			devDependencies.forEach((dep: string): void => {

				if (!usedDeps.includes(dep)) {

					errors.push(
						"[UNUSED - DEV] The installed module \"" + dep + "\" is not used in code"
					);

					result = false;

				}

			});

		}

	return {
		"result": result,
		"warnings": [],
		"errors": errors
	};

};
