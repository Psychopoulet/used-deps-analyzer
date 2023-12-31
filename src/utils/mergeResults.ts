"use strict";

// types & interfaces

	// locals

	import { iResult } from "../interfaces";

// module

export default function mergeResults (source: iResult, target: iResult): void {

	target.result = target.result && source.result;

	source.warnings.forEach((warning: string): void => {
		target.warnings.push(warning);
	});

	source.errors.forEach((error: string): void => {
		target.errors.push(error);
	});

};
