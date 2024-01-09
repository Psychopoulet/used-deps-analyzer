#!/usr/bin/env node

// deps

    // natives
    const { join } = require("node:path");
    const { EOL } = require("node:os");

    // externals

    let colors = null;
    try { // test require optional deps
        colors = require("colors/safe");
    }
    catch (e) {
        // nothing to do here
    }

    // locals
    const usedDepsAnalyzer = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// consts

    const ARGS = (0, process).argv.slice(2, (0, process).argv.length);

// module

Promise.resolve().then(() => {

    if (1 > ARGS.length) {
        return Promise.reject(new ReferenceError("Missing \"packageFile\" argument"));
    }
    else if (2 > ARGS.length) {
        return Promise.reject(new ReferenceError("Missing \"sourcesDir\" argument"));
    }

    return Promise.resolve();

}).then(() => {

    const errors = [];
    const options = {};

        ARGS.forEach((arg, i) => {

            if ("--" !== arg && arg.startsWith("--")) {

                switch (ARGS[i]) {

                    case "--no-dev":
                        options.noDev = true;
                    break;
                    case "--only-dev":
                        options.onlyDev = false;
                    break;

                    case "--overkill":

                        options.overkill = [];

                        for (let j = i + 1; j < ARGS.length && !ARGS[j].startsWith("--"); ++j) {
                            options.overkill.push(ARGS[j]);
                        }

                    break;

                    case "--misscalled":

                        options.misscalled = [];

                        for (let j = i + 1; j < ARGS.length && !ARGS[j].startsWith("--"); ++j) {

                            try {
                                options.misscalled.push(JSON.parse(ARGS[j]));
                            }
                            catch (e) {
                                errors.push("Malformed \"" + String(ARGS[j]) + "\" argument");
                            }

                        }

                    break;

                    case "--shadows":

                        options.shadows = [];

                        for (let j = i + 1; j < ARGS.length && !ARGS[j].startsWith("--"); ++j) {
                            options.shadows.push(ARGS[j]);
                        }

                    break;

                    default:
                        errors.push(new RangeError("Unknown \"" + String(ARGS[i]) + "\" argument"));
                    break;

                }

            }

        });

    return errors.length ?
        Promise.reject(new Error(errors.join(EOL))) :
        usedDepsAnalyzer(ARGS[0], ARGS[1], options).then((analyse) => {

        analyse.warnings.forEach((warn) => {
            (0, console).warn(colors ? colors.yellow(warn) : warn);
        });

        if (analyse.result) {

            (0, process).exitCode = 0;
            (0, process).exit(0);

        }
        else {

            analyse.errors.forEach((err) => {
                (0, console).error(colors ? colors.red(err) : err);
            });

            (0, process).exitCode = 2;
            (0, process).exit(2);

        }

    });

}).catch((err) => {

    const error = err.message ? err.message : err;

    (0, console).log("");
    (0, console).error(colors ? colors.red(error) : error);

    (0, process).exitCode = 1;
    (0, process).exit(1);

});
