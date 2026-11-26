// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // locals
    const usedDepsAnalyzer = require(join(__dirname, "..", "lib", "src", "main.cts"));
    const interfaces = require(join(__dirname, "..", "lib", "src", "interfaces.ts"));

// tests

describe("interfaces", () => {

    it("should load the types module", () => {
        strictEqual(typeof interfaces, "object");
    });

});

describe("package fields", () => {

    it("should accept a package with no dependency fields", () => {

        return usedDepsAnalyzer(join(__dirname, "bare-package", "package.json"), join(__dirname, "bare-package")).then((result) => {

            strictEqual(result.result, true);
            strictEqual(result.errors.length, 0);

        });

    });

    it("should report an unused dev dependency", () => {

        return usedDepsAnalyzer(join(__dirname, "unused-dev", "package.json"), join(__dirname, "unused-dev")).then((result) => {

            strictEqual(result.result, false);
            strictEqual(result.errors.length, 1);
            strictEqual(result.errors[0].includes("[UNUSED - DEV]"), true);
            strictEqual(result.errors[0].includes("never-used"), true);

        });

    });

});
