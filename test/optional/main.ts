"use strict";

// deps

	// externals

	let colors: object | null = null;
	try {
		colors = require("colors/safe");
	}
	catch(e) {
		// nothing to do here
	}

// module

export default function doNothing (): void {
	// nothing to do here
};
