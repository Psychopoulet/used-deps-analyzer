"use strict";

import { interfaces } from "mocha";

// deps

	// externals

	let colors: tColors | null = null;
	try {
		colors = require("colors/safe");
	}
	catch (e) {
		// nothing to do here
	}

// types & interfaces

	type tColors = { [key:string]: (msg: string) => string };

// module

export default function doNothing (): string {
	return (colors as tColors).red ? (colors as tColors).red("test") : "test";
};
