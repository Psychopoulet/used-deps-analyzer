// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // locals
    const usedDepsAnalyzer = require(join(__dirname, "..", "lib", "src", "main.cts"));

// tests

describe("package", () => {

    it("should test missing package", (done) => {

        usedDepsAnalyzer().then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof ReferenceError, true);

            done();

        });

    });

    it("should test wrong type package", (done) => {

        usedDepsAnalyzer(false).then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof TypeError, true);

            done();

        });

    });

    it("should test an unknown package file", (done) => {

        usedDepsAnalyzer(join(__dirname, "not-a-package.json"), join(__dirname)).then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof ReferenceError, true);
            strictEqual(err.message, "Package file not found");

            done();

        });

    });

    it("should test empty package", (done) => {

        usedDepsAnalyzer("").then(() => {
            done(new Error("No error generated"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

});
