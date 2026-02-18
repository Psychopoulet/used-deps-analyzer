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

    let result = true;
    const errors: string[] = [];

        const misscalled: iSubModule[] = options && "object" === typeof options.misscalled && options.misscalled instanceof Array ? options.misscalled : [];

        extractionResult.forEach((f: iExtractionResult): undefined => {

            f.modules.filter((m: string): boolean => {
                return !natives.includes(m);
            }).forEach((m: string): undefined => {

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
                    !dependencies.includes(originalModule)
                    && !devDependencies.includes(originalModule)
                    && !optionalDependencies.includes(originalModule)
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
