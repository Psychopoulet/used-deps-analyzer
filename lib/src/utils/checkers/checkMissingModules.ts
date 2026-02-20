// deps

    // locals
    import natives from "./natives";

// types & interfaces

    // locals
    import type { iOptions, iSubModule, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkMissingModules (
    extractionResult: readonly iExtractionResult[],
    dependencies: readonly string[],
    devDependencies: readonly string[],
    optionalDependencies: readonly string[],
    options?: iOptions
): iResult {

    const nativesSet: Set<string> = new Set(natives);
    const depsSet: Set<string> = new Set(dependencies);
    const devDepsSet: Set<string> = new Set(devDependencies);
    const optionalDepsSet: Set<string> = new Set(optionalDependencies);

    let result = true;
    const errors: string[] = [];

        const misscalled: iSubModule[] = options?.misscalled instanceof Array ? options.misscalled : [];

        extractionResult.forEach((f: iExtractionResult): void => {

            f.modules.filter((m: string): boolean => {
                return !nativesSet.has(m);
            }).forEach((m: string): void => {

                let originalModule: string = m;

                if (0 < misscalled.length) {

                    const converter: iSubModule | undefined = misscalled.find((submodule: iSubModule): boolean => {
                        return m === submodule.call;
                    });

                    if (converter) {
                        originalModule = converter.module;
                    }

                }

                if (
                    !depsSet.has(originalModule)
                    && !devDepsSet.has(originalModule)
                    && !optionalDepsSet.has(originalModule)
                ) {

                    errors.push(
                        "[MISSING] The module \"" + originalModule + "\" used in the file \"" + f.file + "\" is not registered in package dependencies"
                    );

                    result = false;

                }

            });

        });

    return {
        "result": result,
        "warnings": [],
        "errors": errors
    };

}
