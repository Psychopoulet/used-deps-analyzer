"use strict";

// deps

	// externals
	import colors from 'colors/safe';

// module

module.exports = function doNothing () {
	console.log(colors.red("error"));
};
