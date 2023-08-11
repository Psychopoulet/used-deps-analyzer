"use strict";

// deps

	// externals
	import { isFile } from "node-promfs";

// module

export default function doNothing (): Promise<void> {
	return isFile(__filename);
};
