"use strict";

// deps

	// natives
	import { join } from "node:path";

	// externals
	import colors from join(__dirname, "node_modules", "colors", "lib", "index.js");

// module

export default function doNothing (): void {
	console.log(colors.red("error"));
};
