// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // locals
    const usedDepsAnalyzer = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// consts

    const packageFile = join(__dirname, "..", "package.json");
    const sourceDirectory = join(__dirname, "..", "src");

// tests

describe("options", () => {

    it("should test incompatible options", (done) => {

        usedDepsAnalyzer(packageFile, sourceDirectory, {
            "noDev": true,
            "onlyDev": true
        }).then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

});
