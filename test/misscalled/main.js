// deps

    // externals
    const colors = require("colors/safe");

// module

module.exports = function doNothing () {
    (0, console).log(colors.red("error"));
};
