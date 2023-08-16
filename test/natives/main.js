"use strict";

// deps

	// natives
	const { join } = require("node:path");

// module

module.exports = function doNothing () {
	return join(__dirname);
};
