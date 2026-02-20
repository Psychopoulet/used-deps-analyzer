// deps

    // natives
    const { join } = require("path");

// module

module.exports = function doNothing () {
    return join(__dirname);
};
