// deps

    // externals

    let colors = null;
    try {
        colors = require("colors/safe");
    }
    catch (e) {
        // nothing to do here
    }

// module

module.exports = function doNothing () {
    return colors.red ? colors.red("test") : "test";
};
