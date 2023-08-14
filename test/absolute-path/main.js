"use strict";

// deps

	// natives
	const { join } = require("node:path");

	// externals
	import colors from join(__dirname, "node_modules", "colors", "lib", "index.js");

// module

module.exports = function doNothing () {
	console.log(colors.red("error"));
};
