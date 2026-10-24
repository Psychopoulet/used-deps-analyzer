// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // locals
    const usedDepsAnalyzer = require(join(__dirname, "..", "lib", "src", "main.cts"));

// consts

    const packageFile = join(__dirname, "..", "package.json");

// tests

describe("directory", () => {

    it("should test missing directory", (done) => {

        usedDepsAnalyzer(packageFile).then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof ReferenceError, true);

            done();

        });

    });

    it("should test wrong type directory", (done) => {

        usedDepsAnalyzer(packageFile, false).then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof TypeError, true);

            done();

        });

    });

    it("should test an unknown directory", (done) => {

        usedDepsAnalyzer(packageFile, join(__dirname, "not-a-directory")).then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof ReferenceError, true);
            strictEqual(err.message, "Directory to analyse not found");

            done();

        });

    });

    it("should test empty directory", (done) => {

        usedDepsAnalyzer(packageFile, "").then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

});
