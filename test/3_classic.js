
"use strict";

// deps

	// natives
	const { join } = require("node:path");

	// locals
	const usedDepsAnalyzer = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// consts

	const packageFile = join(__dirname, "..", "package.json");
	const sourceDirectory = join(__dirname, "..", "src");

// tests

describe("classic", () => {

	it("should test current module sources", () => {
		return usedDepsAnalyzer(packageFile, sourceDirectory);
	});

});
