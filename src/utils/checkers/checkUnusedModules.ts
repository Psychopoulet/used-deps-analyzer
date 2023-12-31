"use strict";

// types & interfaces

	// locals

	import { iOptions, iSubModule, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkUnusedModules (extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>, options?: iOptions): iResult {

	let result = true;
	const errors: Array<string> = [];

		let usedDeps: Array<string> = [];

			const misscalled: Array<iSubModule> = options && "object" === typeof options.misscalled && options.misscalled instanceof Array ? options.misscalled : [];

			extractionResult.forEach((f: iExtractionResult): void => {

				usedDeps = [ ...usedDeps, ...f.modules.map((m: string): string => {

					let originalModule: string = m;

						if (misscalled.length) {

							const converter: iSubModule | undefined = misscalled.find((submodule: iSubModule): boolean => {
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

		const shadows: Array<string> = options && "object" === typeof options.shadows && options.shadows instanceof Array ? options.shadows : [];

		if ("object" !== typeof options || "boolean" !== typeof options.onlyDev || !options.onlyDev) {

			dependencies.forEach((dep: string): void => {

				if (!usedDeps.includes(dep) && !shadows.includes(dep)) {

					errors.push(
						"[UNUSED] The installed module \"" + dep + "\" is not used in code"
					);

					result = false;

				}

			});

		}

		if ("object" !== typeof options || "boolean" !== typeof options.noDev || !options.noDev) {

			devDependencies.forEach((dep: string): void => {

				if (!usedDeps.includes(dep) && !shadows.includes(dep)) {

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
