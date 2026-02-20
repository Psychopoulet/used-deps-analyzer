// deps

    // natives
    const { join } = require("node:path");

    // externals
    const colors = require(join(__dirname, "node_modules", "colors", "lib", "index.js"));

// module

module.exports = function doNothing () {
    (0, console).log(colors.red("error"));
};
