
"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { strictEqual } = require("node:assert");

	// locals
	const usedDepsAnalyzer = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// consts

	const packageFile = join(__dirname, "..", "package.json");
	const sourceDirectory = join(__dirname, "..", "src");

// tests

describe("classic", () => {

	it("should test incompatible options", (done) => {

		usedDepsAnalyzer(packageFile, sourceDirectory, {
			"noDev": true,
			"onlyDev": true
		}).then(() => {
			done(new Error("No error generated"));
		}).catch((err) => {

			strictEqual(typeof err, "object");
			strictEqual(err instanceof Error, true);

			done();

		});

	});

	it("should test current module sources (sources)", () => {

		return usedDepsAnalyzer(packageFile, sourceDirectory, {
			"noDev": true
		}).then((result) => {

			strictEqual(typeof result, "object");

				strictEqual(typeof result.result, "boolean");
				strictEqual(result.result, true);

				strictEqual(typeof result.warnings, "object");
				strictEqual(result.warnings instanceof Array, true);
				strictEqual(result.warnings.length, 0);

				strictEqual(typeof result.errors, "object");
				strictEqual(result.errors instanceof Array, true);
				strictEqual(result.errors.length, 0);

		});

	});

	it("should test current module sources (tests)", () => {

		return usedDepsAnalyzer(packageFile, join(__dirname, "..", "test"), {
			"noDev": true
		}).then((result) => {

			strictEqual(typeof result, "object");

				strictEqual(typeof result.result, "boolean");
				strictEqual(result.result, true);

				strictEqual(typeof result.warnings, "object");
				strictEqual(result.warnings instanceof Array, true);
				strictEqual(result.warnings.length, 0);

				strictEqual(typeof result.errors, "object");
				strictEqual(result.errors instanceof Array, true);
				strictEqual(result.errors.length, 0);

		});

	});

});
