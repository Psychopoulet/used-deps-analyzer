"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { readFile } = require("node:fs/promises");

// module

module.exports = function doNothing () {

	return readFile(join(__dirname, "node_modules", "jquery", "dist", "jquery.min.js"), "utf-8").then(() => {
		return readFile("./node_modules/bootstrap/dist/js/bootstrap.min.js", "utf-8");
	});

};
