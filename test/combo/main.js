// deps

    // externals
    import colors from "colors/safe";

// module

module.exports = function doNothing () {
    (0, console).log(colors.red("error"));
};
