"use strict";

// deps

	// externals
	import colors from "colors/safe";

// module

export default function doNothing (): void {
	(0, console).log(colors.red("error"));
};
