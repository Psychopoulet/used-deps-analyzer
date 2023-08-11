"use strict";

// deps

	// externals
	const { isFile } = require("node-promfs");

// module

module.exports = function doNothing () {
	return isFile(__filename);
};
