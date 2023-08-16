"use strict";

// deps

	// externals
	import { join } from "node:path";

// module

export default function doNothing (): string {
	return join(__dirname);
};
