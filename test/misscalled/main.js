"use strict";

// deps

	// externals
	const colors = require("colors/safe");

// module

module.exports = function doNothing () {
	console.log(colors.red("error"));
};
