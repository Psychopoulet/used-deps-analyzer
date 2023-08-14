"use strict";

// deps

	// externals
	const colors = require("./node_modules/colors/lib.index.js");

// module

export default function doNothing (): void {
	(0, console).log(colors.red("error"));
};
