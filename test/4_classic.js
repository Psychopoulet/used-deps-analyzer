
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

describe("valid running", () => {

	it("should test current module sources", () => {

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

	it("should test natives", () => {

		return usedDepsAnalyzer(join(__dirname, "natives", "package.json"), join(__dirname, "natives"), {
			"noDev": true
		}).then((result) => {

			strictEqual(typeof result, "object");

				strictEqual(typeof result.result, "boolean");
				strictEqual(result.result, true);

				strictEqual(typeof result.warnings, "object");
				strictEqual(result.warnings instanceof Array, true);
				strictEqual(result.warnings.length, 2);

				strictEqual(typeof result.errors, "object");
				strictEqual(result.errors instanceof Array, true);
				strictEqual(result.errors.length, 0);

		});

	});

	it("should test overkill", () => {

		return usedDepsAnalyzer(join(__dirname, "overkill", "package.json"), join(__dirname, "overkill"), {
			"noDev": true,
			"overkill": [
				"node-promfs"
			]
		}).then((result) => {

			strictEqual(typeof result, "object");

				strictEqual(typeof result.result, "boolean");
				strictEqual(result.result, true);

				strictEqual(typeof result.warnings, "object");
				strictEqual(result.warnings instanceof Array, true);
				strictEqual(result.warnings.length, 2);

				strictEqual(typeof result.errors, "object");
				strictEqual(result.errors instanceof Array, true);
				strictEqual(result.errors.length, 0);

		});

	});

	it("should test unused", () => {

		return usedDepsAnalyzer(join(__dirname, "unused", "package.json"), join(__dirname, "unused"), {
			"noDev": true
		}).then((result) => {

			strictEqual(typeof result, "object");

				strictEqual(typeof result.result, "boolean");
				strictEqual(result.result, false);

				strictEqual(typeof result.warnings, "object");
				strictEqual(result.warnings instanceof Array, true);
				strictEqual(result.warnings.length, 0);

				strictEqual(typeof result.errors, "object");
				strictEqual(result.errors instanceof Array, true);
				strictEqual(result.errors.length, 1);

		});

	});

	it("should test missing", () => {

		return usedDepsAnalyzer(join(__dirname, "missing", "package.json"), join(__dirname, "missing"), {
			"noDev": true
		}).then((result) => {

			strictEqual(typeof result, "object");

				strictEqual(typeof result.result, "boolean");
				strictEqual(result.result, false);

				strictEqual(typeof result.warnings, "object");
				strictEqual(result.warnings instanceof Array, true);
				strictEqual(result.warnings.length, 0);

				strictEqual(typeof result.errors, "object");
				strictEqual(result.errors instanceof Array, true);
				strictEqual(result.errors.length, 2);

		});

	});

	it("should test misscalled compatibility", () => {

		return usedDepsAnalyzer(join(__dirname, "misscalled", "package.json"), join(__dirname, "misscalled"), {
			"noDev": true,
			"misscalled": [
				{
					"module": "colors",
					"call": "colors/safe"
				}
			]
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

	it("should test shadows compatibility", () => {

		return usedDepsAnalyzer(join(__dirname, "shadows", "package.json"), join(__dirname, "shadows"), {
			"noDev": true,
			"shadows": [ "colors" ]
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
