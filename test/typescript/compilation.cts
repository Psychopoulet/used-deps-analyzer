/// <reference path="../../lib/cjs/main.d.cts" />

"use strict";

// deps

	// natives
	import { join } from "node:path";

	// locals
	import usedDepsAnalyzer = require("../../lib/cjs/main.cjs");

// consts

	const packageFile: string = join(__dirname, "..", "..", "package.json");
	const sourceDirectory: string = join(__dirname, "..", "..", "src");

// module

usedDepsAnalyzer(packageFile, sourceDirectory).then((analyze): void => {

	if (analyze.warnings) {

		analyze.warnings.forEach((a) => {
			console.warn(a);
		});

	}

	if (analyze.result) {
		console.log("all ok");
	}
	else {

		analyze.errors.forEach((a) => {
			console.error(a);
		});

	}

}).catch((err: Error): void => {

	console.error(err);

	process.exitCode = 1;
	process.exit(1);

});
