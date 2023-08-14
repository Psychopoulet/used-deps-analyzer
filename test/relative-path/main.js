"use strict";

// deps

	// externals
	import colors from "./node_modules/colors/lib.index.js";

// module

module.exports = function doNothing () {
	console.log(colors.red("error"));
};
