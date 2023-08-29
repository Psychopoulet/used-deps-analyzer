"use strict";

// deps

	// natives
	import { join } from "node:path";
	import { readFile } from "node:fs/promises";

// module

export default function doNothing (): Promise<string> {

	return readFile(join(__dirname, "node_modules", "jquery", "dist", "jquery.min.js"), "utf-8").then((): Promise<string> => {
		return readFile("./node_modules/bootstrap/dist/js/bootstrap.min.js", "utf-8");
	});

};
